<script lang="ts" setup>
import { advanceCycle } from '@/service/advanceCycle'
import { futureAliveMembers, store } from '@/service/store'
import { ref } from 'vue'
import ToggleSwitch from './ToggleSwitch.vue'
import { warmUp } from '@/service/audio'

const voteResultSelection = ref(false)
const selectedUser = ref(null as string | null)

function startVoteResult() {
  voteResultSelection.value = true
}

async function start() {
  voteResultSelection.value = false
  if (!store.room) return
  if (selectedUser.value) await advanceCycle(selectedUser.value)
  else await advanceCycle()
}
</script>

<template>
  <div class="full-width" v-if="voteResultSelection">
    <div>who got voted out by majority?</div>
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
      <span v-if="selectedUser"> we killed {{ store.users[selectedUser ?? '']?.name }} and they revealed their role </span>
      <span v-else>nobody voted</span>
    </button>
  </div>
  <div class="col" v-if="!voteResultSelection && store.room?.nightCycle === 0">
    <div class="row">
      <button class="btn" @click="startVoteResult()">voting has finished</button>
      <span class="switch-container" @click="warmUp">
        <span class="sm">Narrate</span> 🔊
        <toggle-switch
          class="ml-05"
          @changed="(v) => (store.enableSound = v)"
          :initial-value="store.enableSound"
        />
      </span>
    </div>
    <div class="row center sm">
      <a @click="store.showAllRoles = true" href="javascript:void(0)">show all roles</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.switch-container {
  display: flex;
  align-items: center;
}
.center {
  justify-content: center;
}
</style>
