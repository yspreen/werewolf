<script lang="ts" setup>
import { Role } from '@/models/role'
import { NightCycle } from '@/models/room'
import { api } from '@/service/api'
import { futureAliveMembers } from '@/service/store'
import { store, myRole } from '@/service/store'
import { computed, ref } from 'vue'

const selectedUser = ref(null as string | null)
const isHunter = computed(() => myRole.value === Role[Role.HUNTER])
const showVoting = computed(
  () => store.room?.nightCycle === +NightCycle.HUNTER || store.room?.hunterDayKill
)

async function killUser(userId: string | null) {
  selectedUser.value = null
  if (!userId) return
  await api.post('/hunter', { userId, roomId: store.room?.roomId })
}
</script>

<template>
  <div class="full-width" v-if="isHunter && showVoting">
    <div>You got killed. As the hunter you choose one person to take with you:</div>
    <div v-for="member in futureAliveMembers" :key="member.userId" class="row">
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
