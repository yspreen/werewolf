<script setup lang="ts">
import { isDead, isLover, myRole, store } from '@/service/store'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/service/api'
import { loadUser } from '@/service/loadUser'
import { Role, stringToRole } from '@/models/role'
import { fetchMembers } from '@/service/fetchMembers'
import { NightCycle, numberToCycle } from '@/models/room'
import RoleDisplay from './RoleDisplay.vue'
import DeathDisplay from './DeathDisplay.vue'
import EndDay from './EndDay.vue'
import WerewolfAction from './WerewolfAction.vue'
import SeerAction from './SeerAction.vue'
import CupidAction from './CupidAction.vue'
import HunterAction from './HunterAction.vue'
import WitchAction from './WitchAction.vue'

const router = useRouter()

let interval = null as number | null

onMounted(async () => {
  await loadUser()
  await timer()
  interval = setInterval(() => timer().then(() => {}), 1000)
})

onUnmounted(() => {
  if (interval === null) return

  store.nightMode = false
  clearInterval(interval)
  interval = null
})

const waitingForDelay = ref(false)
async function timer() {
  if (waitingForDelay.value) return
  const newRoom = (await api.get(`/room/${router.currentRoute.value.params.roomId}`)).room
  if (!newRoom) {
    return
  }
  if (!newRoom.memberIds.includes(store.user?.userId ?? '')) {
    return router.push('/')
  }
  await fetchMembers(newRoom)
  store.nightMode = newRoom.nightCycle > 0
  if (!store.room || store.room?.nightCycle === newRoom.nightCycle) {
    store.room = newRoom
    return
  }

  waitingForDelay.value = true
  setTimeout(() => {
    waitingForDelay.value = false
    store.room = newRoom
    newCycle().catch(console.error)
  }, 3000)
}

function vibrate() {
  navigator.vibrate([100, 30, 100, 30, 100])
}

async function newCycle() {
  if (store.room?.nightCycle === NightCycle.DAY) vibrate()
  const role = stringToRole(myRole.value)
  const cycleNum = store.room?.nightCycle ?? 0
  const cycle = numberToCycle(cycleNum)

  if (role === Role.THIEF && cycle === NightCycle.THIEF) vibrate()
  if (role === Role.CUPID && cycle === NightCycle.CUPID) vibrate()
  if (role === Role.WEREWOLF && cycle === NightCycle.WEREWOLF) vibrate()
  if (role === Role.SEER && cycle === NightCycle.SEER) vibrate()
  if (role === Role.HUNTER && cycle === NightCycle.HUNTER) vibrate()
  if (role === Role.WITCH && cycle === NightCycle.WITCH) vibrate()
  if (isLover && cycle === NightCycle.LOVERS) vibrate()
}
</script>

<template>
  <div class="col">
    <role-display />
    <death-display v-if="!waitingForDelay" />

    <div class="row mt-1" v-if="!waitingForDelay">
      <end-day />
      <werewolf-action v-if="!isDead" />
      <seer-action />
      <hunter-action />
      <cupid-action />
      <witch-action />
    </div>
  </div>
</template>

<style scoped></style>
