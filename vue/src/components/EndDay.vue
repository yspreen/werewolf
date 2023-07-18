<script lang="ts" setup>
import { advanceCycle } from '@/service/advanceCycle'
import { warmUpAudio } from '@/service/cycleChanged'
import { futureAliveMembers, isDead, store } from '@/service/store'
import { ref } from 'vue'
import ToggleSwitch from './ToggleSwitch.vue'

const voteResultSelection = ref(false)
const selectedUser = ref(null as string | null)

function startVoteResult() {
  voteResultSelection.value = true
}

async function start() {
  voteResultSelection.value = false
  if (!store.room) return
  store.room.nightCycle += 1
  if (selectedUser.value) await advanceCycle(selectedUser.value)
  else await advanceCycle()
}
</script>

<template>
  <div class="full-width" v-if="voteResultSelection">
    <div>who got voted out?</div>
    <div v-for="member in futureAliveMembers" :key="member.userId" class="row">
      {{ member.name }} {{ member.userId === store.user?.userId ? '(me)' : '' }}
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
  <div class="row" v-if="!isDead && store.room?.nightCycle === 0 && !voteResultSelection">
    <button class="btn" @click="startVoteResult()">start night</button>
    <span class="switch-container" @click="warmUpAudio">
      <span class="sm">Narrate</span> 🔊
      <toggle-switch
        class="ml-05"
        @changed="(v) => (store.enableSound = v)"
        :initial-value="store.enableSound"
      />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.switch-container {
  display: flex;
  align-items: center;
}
</style>
