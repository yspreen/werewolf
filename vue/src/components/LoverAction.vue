<script lang="ts" setup>
import { NightCycle } from '@/models/room'
import { advanceCycle } from '@/service/advanceCycle'
import { isLover, store } from '@/service/store'
import { computed } from 'vue'

const otherLover = computed(() => {
  const lovers = store.room?.lovers ?? []
  const loverId = (lovers.filter((userId) => userId !== store.user?.userId) ?? [''])[0]

  return store.users[loverId]?.name
})
</script>

<template>
  <div v-if="isLover && store.room?.nightCycle === NightCycle.LOVERS" class="col">
    <div class="full-width">You're in love with {{ otherLover }}.</div>
    <div class="full-width">
      <button class="btn" @click="advanceCycle()">We've both seen each other. Continue</button>
    </div>
  </div>
</template>
