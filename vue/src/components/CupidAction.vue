<script lang="ts" setup>
import { Role } from '@/models/role'
import { NightCycle } from '@/models/room'
import { api } from '@/service/api'
import { aliveMembers, myRole, store } from '@/service/store'
import { computed, ref } from 'vue'

const firstLover = ref(null as string | null)
const selectedUser = ref(null as string | null)

const isCupid = computed(() => myRole.value === Role[Role.CUPID])

async function step() {
  const userId = selectedUser.value
  selectedUser.value = null
  if (!userId) return
  if (firstLover.value) {
    await api.post('/cupid', {
      roomId: store.room?.roomId,
      lovers: [firstLover.value, userId]
    })
    return
  }
  firstLover.value = userId
}
</script>

<template>
  <div v-if="isCupid && store.room?.nightCycle === NightCycle.CUPID" class="col">
    <div class="full-width">
      You're cupid. Select two people to be this game's couple.
      {{ firstLover ? 'Second' : 'First' }} lover:
    </div>
    <div class="full-width">
      <div v-for="member in aliveMembers" :key="member.userId" class="row">
        <template v-if="member.userId !== firstLover">
          {{ member.name }}
          <button
            class="btn"
            @click="selectedUser = member.userId"
            v-if="selectedUser !== member.userId"
          >
            select
          </button>
        </template>
      </div>
      <button class="btn" :class="selectedUser ? '' : 'danger'" @click="step()">
        confirm {{ store.users[selectedUser ?? '']?.name ?? '&lt; select &gt;' }}
      </button>
    </div>
  </div>
</template>
