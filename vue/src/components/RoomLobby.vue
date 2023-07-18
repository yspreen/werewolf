<script setup lang="ts">
import { store } from '@/service/store'
import { computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/service/api'
import { loadUser } from '@/service/loadUser'
import { fetchMembers } from '@/service/fetchMembers'
import { allRoles } from '@/models/role'
import LobbyRoles from './LobbyRoles.vue'

const router = useRouter()

const sumOfRoles = computed(() => {
  if (!store.room) return 0
  return Object.values(store.room.roleCount).reduce((a, b) => a + b, 0)
})

const canStart = computed(() => {
  return sumOfRoles.value == members.value.length
})
const isAdmin = computed(() => {
  return store.room?.admins.includes(store.user?.userId ?? '')
})

const startButtonTitle = computed(() => {
  if (sumOfRoles.value < members.value.length) return 'please add more roles'
  if (sumOfRoles.value > members.value.length) return 'you added too many roles'
  return 'start'
})

const members = computed(() => {
  let memberIds = store.room?.memberIds
  if (!memberIds) return []
  return memberIds.map((memberId) => store.users[memberId]).filter((user) => user)
})

let interval = null as NodeJS.Timer | null

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
  store.room = (await api.get(`/room/${router.currentRoute.value.params.roomId}`)).room
  if (!Object.keys(store.room?.roleCount ?? {}).length) {
    allRoles.forEach((role) => {
      store.room && (store.room.roleCount[role] = 0)
    })
  }
  if (!store.room?.memberIds.includes(store.user?.userId ?? '')) {
    return router.push('/')
  }
  if (store.room.givenRoles !== null) {
    return router.push(`/playing/${router.currentRoute.value.params.roomId}`)
  }
  await fetchMembers(store.room)
}

async function giveRoles() {
  if (!canStart.value) return

  await api.post(`/start-game`, {
    roomId: store.room?.roomId,
    roleCount: store.room?.roleCount
  })
  await timer()
}

async function kick(userId: string) {
  if (!store.room) return
  store.room.memberIds = store.room.memberIds.filter((val) => val !== userId)
  await api.post('/update-room', { room: store.room })
}
</script>

<template>
  <div class="col">
    <div>your name: {{ store.user?.name }}</div>
    <div class="row">{{ store.room?.name }}</div>
    <lobby-roles />
    <div class="row">{{ members.length }} members:</div>
    <div class="row" v-for="member in members" :key="member.userId">
      {{ member.name }}
      <button class="btn" v-if="isAdmin" @click="kick(member.userId)">kick</button>
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
