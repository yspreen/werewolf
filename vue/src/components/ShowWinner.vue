<script lang="ts" setup>
import type { WINNER } from '@/models/room'
import { store } from '@/service/store'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import MarqueeText from './MarqueeText.vue'

function winnerEmoji(winner: WINNER) {
  switch (winner) {
    case 'VILLAGERS':
      return '🧑‍🌾'
    case 'WEREWOLVES':
      return '🐺'
    case 'LOVERS':
      return '💘'
    case 'JESTER':
      return '🃏'
  }
}

const winner = computed(() => store.room?.winner ?? 'VILLAGERS')
const winnerTitle = computed(() => `${winner.value[0]}${winner.value.slice(1).toLowerCase()}`)
const emoji = computed(() => winnerEmoji(winner.value))
</script>

<template>
  <div class="col">
    <span class="win">{{ winnerTitle }} won! {{ emoji }}</span>
    <RouterLink to="/"> leave game </RouterLink>
    <div class="sm row mt-3">
      &nbsp;
      <span>this app is free. servers are not. if you want to, you can</span>
      &nbsp;
    </div>
    <div class="row sm">
      &nbsp;
      <a class="btn" href="https://venmo.com/u/yspreen" target="_blank">buy me a coffee ❤️</a>
      &nbsp;
    </div>
  </div>
</template>

<style scoped lang="scss">
span.win {
  font-size: 2em;
}
</style>
