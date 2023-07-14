<script setup lang="ts">
import { store } from '@/service/store'
import type { Room } from '@/models/room'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/service/api'
import { loadUser } from '@/service/loadUser'
import { fetchMembers } from '@/service/fetchMembers'
import { allRoles, roleName } from '@/models/role'

const router = useRouter()
const room = ref(null as Room | null)

let roleCount = ref({} as Record<string, number>)
allRoles.forEach((role) => {
  roleCount.value[role] = 0
})

const sumOfRoles = computed(() => {
  return Object.values(roleCount.value).reduce((a, b) => a + b, 0)
})

const canStart = computed(() => {
  return sumOfRoles.value == members.value.length
})
const isAdmin = computed(() => {
  return room.value?.admins.includes(store.user?.userId ?? '')
})

const startButtonTitle = computed(() => {
  if (sumOfRoles.value < members.value.length) return 'please add more roles'
  if (sumOfRoles.value > members.value.length) return 'you added too many roles'
  return 'start'
})

const members = computed(() => {
  let memberIds = room.value?.memberIds
  if (!memberIds) return []
  return memberIds.map((memberId) => store.users[memberId]).filter((user) => user)
})

let interval = null as number | null

onMounted(async () => {
  await loadUser()
  await timer()
  interval = setInterval(() => timer().then(() => {}), 1000)
})

onUnmounted(() => {
  if (interval === null) return

  clearInterval(interval)
  interval = null
})

async function timer() {
  room.value = (await api.get(`/room/${router.currentRoute.value.params.roomId}`)).room
  if (!room.value?.memberIds.includes(store.user?.userId ?? '')) {
    return router.push('/')
  }
  if (room.value.givenRoles !== null) {
    return router.push(`/playing/${router.currentRoute.value.params.roomId}`)
  }
  await fetchMembers(room.value)
}

function changeCount(role: string, diff: number) {
  if (roleCount.value[role] + diff < 0) return
  roleCount.value[role] += diff
}

async function giveRoles() {
  if (!canStart.value) return

  await api.post(`/start-game`, {
    roomId: room.value?.roomId,
    roleCount: roleCount.value
  })
  await timer()
}
</script>

<template>
  <div class="col">
    <div>your name: {{ store.user?.name }}</div>
    <div class="row">{{ room?.name }}</div>
    <div class="row">roles:</div>
    <div class="row" v-for="role in allRoles" :key="role">
      <span>{{ roleName(role) }}</span>
      <span
        ><button @click="changeCount(role, -1)" v-if="isAdmin">-</button> {{ roleCount[role] }}
        <button @click="changeCount(role, 1)" v-if="isAdmin">+</button></span
      >
    </div>
    <div class="row">{{ members.length }} members:</div>
    <div class="row" v-for="member in members" :key="member.userId">
      {{ member.name }} <button class="btn" v-if="isAdmin">kick</button>
    </div>
    <div class="row" v-if="isAdmin">
      <button
        class="btn"
        :class="canStart ? '' : 'danger'"
        href="javascript:void(0)"
        @click="giveRoles"
      >
        {{ startButtonTitle }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
