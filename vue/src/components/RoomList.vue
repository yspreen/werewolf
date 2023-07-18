<script setup lang="ts">
import { store } from '@/service/store'
import type { Room } from '@/models/room'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/service/api'
import { loadUser } from '@/service/loadUser'

const router = useRouter()
const rooms = ref([] as Room[])

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
  const allRooms: Room[] = (await api.get('/rooms')).rooms
  rooms.value = allRooms.filter((room) => room.givenRoles === null)
}

async function open(room: Room) {
  await api.post(`/join`, { roomId: room.roomId })
  router.push(`/room/${room.roomId}`)
}
async function newRoom() {
  const { room } = (await api.post(`/rooms`)) as { room: Room }
  await open(room)
}
</script>

<template>
  <div class="col">
    <div>your name: {{ store.user?.name }}</div>
    <div v-for="room in rooms" :key="room.roomId" class="row">
      <a href="javascript:void(0)" @click="open(room)">{{ room.name }}</a>
    </div>
    <button @click="newRoom" class="btn">new room</button>
  </div>
</template>

<style scoped></style>
