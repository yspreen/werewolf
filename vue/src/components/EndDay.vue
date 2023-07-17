<script lang="ts" setup>
import { advanceCycle } from '@/service/advanceCycle'
import { futureAliveMembers, isDead, store } from '@/service/store'
import { ref } from 'vue'

const voteResultSelection = ref(false)
const selectedUser = ref(null as string | null)

function startVoteResult() {
  voteResultSelection.value = true
}

async function start() {
  voteResultSelection.value = false
  if (selectedUser.value) await advanceCycle(selectedUser.value)
  else await advanceCycle()
}
</script>

<template>
  <div class="full-width" v-if="voteResultSelection">
    <div>who got voted out?</div>
    <div v-for="member in futureAliveMembers" :key="member.userId" class="row">
      {{ member.name }}
      <button
        class="btn"
        @click="selectedUser = member.userId"
        v-if="selectedUser !== member.userId"
      >
        select
      </button>
      <button class="btn" @click="selectedUser = null" v-else>deselect</button>
    </div>
    <button class="btn" @click="start()">
      <span v-if="selectedUser"> confirm {{ store.users[selectedUser ?? '']?.name }} </span>
      <span v-else>nobody voted</span>
    </button>
  </div>
  <button
    class="btn"
    @click="startVoteResult()"
    v-if="!isDead && store.room?.nightCycle === 0 && !voteResultSelection"
  >
    start night
  </button>
</template>
