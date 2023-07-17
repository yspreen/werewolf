<script lang="ts" setup>
import type { WINNER } from '@/models/room'
import { store } from '@/service/store'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

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
    <span>{{ winnerTitle }} won! {{ emoji }}</span>
    <RouterLink to="/"> leave game </RouterLink>
  </div>
</template>

<style scoped lang="scss">
span {
  font-size: 2em;
}
</style>
