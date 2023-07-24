<script lang="ts" setup>
import { NightCycle } from '@/models/room'
import { store } from '@/service/store'
import { playSound, AudioFile, warmUp } from '@/service/audio'
import { computed } from 'vue'

const timerRunning = computed(() => store.timerSecondsLeft >= 0)
const timeString = computed(() => {
  const s = ~~(store.timerSecondsLeft % 60)
  const m = ~~(store.timerSecondsLeft / 60)
  return `${m}:${`${s}`.padStart(2, '0')}`
})

async function start(seconds: number) {
  await warmUp()
  store.timerSecondsLeft = seconds
  interval = setInterval(() => timer(), 950)
}

let interval: NodeJS.Timer | undefined

function timer() {
  store.timerSecondsLeft -= 1
  if (!timerRunning.value) stopTimer()
}

function stopTimer(withSound: boolean = true) {
  store.timerSecondsLeft = -1
  if (interval) clearInterval(interval)
  if (withSound) playSound(AudioFile.alarm, true).catch(console.error)
}
</script>

<template>
  <div v-if="store.room?.nightCycle === NightCycle.DAY" class="row">
    <template v-if="timerRunning">
      <span>
        <span class="time"> {{ timeString }} </span>
        <a href="javascript:void(0)" @click="stopTimer(false)" class="sm">❌</a></span
      >
    </template>
    <template v-else>
      <a href="javascript:void(0)" @click="start(30)">⏱️ 30s</a>
      <a href="javascript:void(0)" @click="start(60)">⏱️ 60s</a>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.row {
  justify-content: space-evenly;
  margin-bottom: 1em;
}
.time {
  display: inline-block;
  min-width: 1.8em;
  margin: 0 0.5em;
}
</style>
