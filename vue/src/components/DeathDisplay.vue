<script lang="ts" setup>
import { NightCycle } from '@/models/room'
import { isDead, store } from '@/service/store'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const diedJustNow = computed(() => {
  if (!store.showIfIDiedJustNow && store.room?.nightCycle !== NightCycle.DAY) return false
  return store.room?.diedTonight.includes(store.user?.userId ?? '')
})
</script>

<template>
  <div
    class="row mt-1"
    v-if="store.room?.diedTonight.length && store.room.nightCycle === NightCycle.DAY"
  >
    These people died tonight:
    {{ store.room?.diedTonight.map((userId) => store.users[userId].name).join(', ') }}
  </div>
  <div class="row mt-1" v-if="isDead || diedJustNow">
    You died 💀 <RouterLink to="/"> leave game </RouterLink>
  </div>
</template>
