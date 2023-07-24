<script setup lang="ts">
import { NightCycle, allCycles } from '@/models/room'
import { store } from '@/service/store'
import { computed } from 'vue'

const cycle = computed(() => store.room?.nightCycle ?? NightCycle.DAY)

const props = defineProps({ waitingForDelay: Boolean })

function cycleEmoji(cycle: NightCycle) {
  switch (cycle) {
    case NightCycle.DAY:
      return '☀️'
    case NightCycle.THIEF:
      return '🥷'
    case NightCycle.CUPID:
      return '🏹'
    case NightCycle.LOVERS:
      return '💘'
    case NightCycle.WEREWOLF:
      return '🐺'
    case NightCycle.SEER:
      return '🔮'
    case NightCycle.WITCH:
      return '🧙‍♀️'
    case NightCycle.HUNTER:
      return '📯'
    default:
      return '?'
  }
}

const cycleList = computed(() =>
  allCycles.map((val) => ({ emoji: cycleEmoji(val), isActive: cycle.value === val }))
)
</script>

<template>
  <div class="full-width emojis" v-if="props.waitingForDelay || ~~cycle !== cycle">
    <span class="emoji">⏳</span>
  </div>

  <div class="full-width emojis" v-else>
    <span
      v-for="cycle in cycleList"
      :key="cycle.emoji"
      :class="cycle.isActive ? 'active' : ''"
      class="emoji"
    >
      {{ cycle.emoji }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.emojis {
  margin-bottom: 1em;
}
.emoji {
  margin: 0 0.2em;
  position: relative;
  &:not(.active) {
    opacity: 0.3;
  }
  &.active {
    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: -0.1em;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: black;
      body.night & {
        background-color: white;
      }
    }
  }
}
</style>
