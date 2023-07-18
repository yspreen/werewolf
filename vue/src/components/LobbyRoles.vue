<script lang="ts" setup>
import { Role, allRoles, roleName } from '@/models/role'
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
  store.room.roleCount[Role[Role.THIEF]] = Math.min(1, store.room.roleCount[Role[Role.THIEF]])
  await api.post('/update-room', { room: store.room })
}
</script>

<template>
  <div class="row sm pt-1">roles:</div>
  <div class="row" v-for="role in allRoles" :key="role">
    <span :class="store.room?.roleCount[role] === 0 ? 'semi-transparent' : ''">{{
      roleName(role)
    }}</span>
    <span
      ><button @click.prevent="changeCount(role, -1)" v-if="isAdmin">-</button>
      {{ store.room?.roleCount[role] }}
      <button @click.prevent="changeCount(role, 1)" v-if="isAdmin">+</button></span
    >
  </div>
</template>
