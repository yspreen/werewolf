<script lang="ts" setup>
import { Role } from '@/models/role'
import { NightCycle } from '@/models/room'
import { api } from '@/service/api'
import { aliveMembers } from '@/service/store'
import { store, myRole } from '@/service/store'
import { computed, ref } from 'vue'

const selectedUser = ref(null as string | null)
const isWerewolf = computed(() => myRole.value === Role[Role.WEREWOLF])

async function killUser(userId: string | null) {
  selectedUser.value = null
  if (!userId || !store.room) return
  store.room.nightCycle += 1
  await api.post('/werewolf', { userId, roomId: store.room?.roomId })
}
</script>

<template>
  <div class="full-width" v-if="isWerewolf && store.room?.nightCycle === +NightCycle.WEREWOLF">
    <div class="sm mb-1">
      Note: First person to click "kill" makes the decision. Make sure to vote with your fellow
      werewolfs before committing!
    </div>
    <div v-for="member in aliveMembers" :key="member.userId" class="row">
      {{ member.name }} {{ member.userId === store.user?.userId ? '(me)' : '' }}
      <button
        class="btn"
        @click="selectedUser = member.userId"
        v-if="selectedUser !== member.userId"
      >
        select
      </button>
    </div>
    <button class="btn" :class="selectedUser ? '' : 'danger'" @click="killUser(selectedUser)">
      kill {{ store.users[selectedUser ?? '']?.name ?? '&lt; select &gt;' }}
    </button>
  </div>
</template>
