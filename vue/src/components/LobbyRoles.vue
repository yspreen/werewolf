<script lang="ts" setup>
import { allRoles, roleName } from '@/models/role'
import { api } from '@/service/api'
import { store } from '@/service/store'
import { computed } from 'vue'

const isAdmin = computed(() => {
  return store.room?.admins.includes(store.user?.userId ?? '')
})

async function changeCount(role: string, diff: number) {
  if (!store.room) return
  if (store.room.roleCount[role] + diff < 0) return
  store.room.roleCount[role] += diff
  await api.post('/update-room', { room: store.room })
}
</script>

<template>
  <div class="row">roles:</div>
  <div class="row" v-for="role in allRoles" :key="role">
    <span :class="store.room?.roleCount[role] === 0 ? 'semi-transparent' : ''">{{
      roleName(role)
    }}</span>
    <span
      ><button @click="changeCount(role, -1)" v-if="isAdmin">-</button>
      {{ store.room?.roleCount[role] }}
      <button @click="changeCount(role, 1)" v-if="isAdmin">+</button></span
    >
  </div>
</template>
