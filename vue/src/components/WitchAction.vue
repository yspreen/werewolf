<script lang="ts" setup>
import { Role } from '@/models/role'
import { NightCycle } from '@/models/room'
import { advanceCycle } from '@/service/advanceCycle'
import { api } from '@/service/api'
import { aliveMembers, myRole, store } from '@/service/store'
import { computed, ref } from 'vue'

const selectedUser = ref(null as string | null)
const stage = ref(initialStep())
const options = computed(() => {
  if (stage.value == 0) return store.room?.diedTonight.map((id) => (store.users[id] ?? ({} as any))) ?? [];
  return aliveMembers.value 
})

function initialStep(): number {
  if (!store.room?.witchPotions[0]) return 1
  if (!store.room?.diedTonight.length) return 1
  return 0
}

const isWitch = computed(() => {
  return myRole.value === Role[Role.WITCH]
})

async function step() {
  const userId = selectedUser.value
  const roomId = store.room?.roomId
  if (!roomId) return

  selectedUser.value = null
  stage.value += 1
  if (stage.value == 1) {
    userId && (await api.post('/witch-action', { action: 'heal', userId, roomId }))
    if (aliveMembers.value.length && store.room?.witchPotions[1]) return
  } else {
    userId && (await api.post('/witch-action', { action: 'kill', userId, roomId }))
  }
  await advanceCycle()
}
</script>

<template>
  <div class="col" v-if="isWitch && store.room?.nightCycle === NightCycle.WITCH">
    <div class="full-width">{{ stage == 0 ? 'heal' : 'kill' }} someone?</div>
    <div class="full-width">
      <div v-for="member in options" :key="member.userId" class="row">
        {{ member.name }} {{ member.userId === store.user?.userId ? '(me)' : '' }}
        <button
          class="btn"
          @click="selectedUser = member.userId"
          v-if="selectedUser !== member.userId"
        >
          select
        </button>
      </div>
      <button class="btn" @click="step()">
        <span v-if="selectedUser">
          {{ stage == 0 ? 'heal' : 'kill' }}
          {{ store.users[selectedUser ?? '']?.name ?? '' }}
        </span>
        <span v-else>skip</span>
      </button>
    </div>
  </div>
</template>
