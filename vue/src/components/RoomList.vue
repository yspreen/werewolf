<script setup lang="ts">
import { store } from '@/service/store'
import type { Room } from '@/models/room'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/service/api'
import { loadUser } from '@/service/loadUser'

const router = useRouter()
const rooms = ref([] as Room[])

onMounted(async () => {
  await loadUser()
  rooms.value = (await api.get('/rooms')).rooms
})

async function open(room: Room) {
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
    <a href="javascript:void(0)" @click="newRoom">new room</a>
  </div>
</template>

<style scoped></style>
