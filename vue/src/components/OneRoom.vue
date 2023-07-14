<script setup lang="ts">
import { store } from '@/service/store'
import type { Room } from '@/models/room'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/service/api'
import { loadUser } from '@/service/loadUser'

const router = useRouter()
const room = ref(null as Room | null)

let interval = null as number | null

const members = computed(() => {
  let memberIds = room.value?.memberIds
  if (!memberIds) return []
  return memberIds.map((memberId) => store.users[memberId]).filter((user) => user)
})

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
  await Promise.all(
    room.value?.memberIds.map(async (memberId) => {
      if (store.users[memberId]) return
      store.users[memberId] = (await api.get(`/user/${memberId}`)).user
    }) ?? []
  )
}
</script>

<template>
  <div class="col">
    <div>your name: {{ store.user?.name }}</div>
    <div class="row">{{ room?.name }}</div>
    <div class="row">{{ members.length }} members:</div>
    <div class="row" v-for="member in members" :key="member.userId">
      {{ member.name }}
    </div>
    <a class="row" href="javascript:void(0)">give everyone their role</a>
  </div>
</template>

<style scoped></style>
