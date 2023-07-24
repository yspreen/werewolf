<script setup lang="ts">
import { isDead, store } from '@/service/store'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/service/api'
import { loadUser } from '@/service/loadUser'
import { fetchMembers } from '@/service/fetchMembers'
import { cycleChanged } from '@/service/cycleChanged'
import RoleDisplay from './RoleDisplay.vue'
import DeathDisplay from './DeathDisplay.vue'
import EndDay from './EndDay.vue'
import WerewolfAction from './WerewolfAction.vue'
import SeerAction from './SeerAction.vue'
import CupidAction from './CupidAction.vue'
import HunterAction from './HunterAction.vue'
import WitchAction from './WitchAction.vue'
import LoverAction from './LoverAction.vue'
import CycleDisplay from './CycleDisplay.vue'
import ShowWinner from './ShowWinner.vue'
import { type Room } from '@/models/room'
import NoSleep from '@uriopass/nosleep.js'
import ThiefAction from './ThiefAction.vue'
import { AudioFile, playSound } from '@/service/audio'
import DayTimer from './DayTimer.vue'
const router = useRouter()

let interval = null as NodeJS.Timer | null
const noSleep = new NoSleep()

onMounted(async () => {
  await loadUser()
  await timer()
  interval = setInterval(() => timer().catch(console.error), 1000)
  await noSleep.enable()
})

onUnmounted(async () => {
  if (interval === null) return

  store.nightMode = false
  clearInterval(interval)
  interval = null
  noSleep.disable()
})

const waitingForDelay = ref(false)
async function timer() {
  if (waitingForDelay.value) return
  const newRoom: Room = (await api.get(`/room/${router.currentRoute.value.params.roomId}`)).room
  if (!newRoom) return
  if (!newRoom.memberIds.includes(store.user?.userId ?? '')) {
    store.room = null
    return router.push('/')
  }
  if (store.room && store.room.v > newRoom.v) return
  await fetchMembers(newRoom)
  store.nightMode = newRoom.nightCycle > 0
  if (newRoom.winner && store.room && !store.room.winner) {
    playSound(AudioFile.win)
    noSleep.disable()
  }
  if (!store.room || store.room?.nightCycle === newRoom.nightCycle || newRoom.winner) {
    store.room = newRoom
    return
  }

  waitingForDelay.value = true
  setTimeout(() => {
    waitingForDelay.value = false
    store.room = newRoom
    cycleChanged().catch(console.error)
  }, 3000)
}
</script>

<template>
  <show-winner v-if="store.room?.winner" />
  <div class="col" v-else>
    <day-timer v-if="!waitingForDelay" />
    <cycle-display :waitingForDelay="waitingForDelay" />
    <role-display />
    <death-display v-if="!waitingForDelay" />

    <div class="row mt-1" v-if="!waitingForDelay && store.room">
      <end-day v-if="!store.room?.hunterDayKill" />
      <werewolf-action v-if="!isDead" />
      <seer-action />
      <hunter-action />
      <cupid-action />
      <witch-action />
      <lover-action />
      <thief-action />
    </div>
  </div>
</template>

<style scoped></style>
