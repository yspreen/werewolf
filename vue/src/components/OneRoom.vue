<script setup lang="ts">
import { store } from '@/service/store'
import type { Room } from '@/models/room'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/service/api'
import { loadUser } from '@/service/loadUser'

const router = useRouter()
const room = ref(null as Room | null)

onMounted(async () => {
  await loadUser()
  room.value = (await api.get(`/room/${router.currentRoute.value.params.roomId}`)).room
})
</script>

<template>
  <div class="col">
    <div>your name: {{ store.user?.name }}</div>
    <div class="row">{{ room?.name }}</div>
    <div class="row">{{ room?.memberIds.length }} members</div>
    <a class="row" href="javascript:void(0)">give everyone their role</a>
  </div>
</template>

<style scoped></style>
