<script lang="ts" setup>
import { store } from '@/service/store'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const winner = computed(() => store.room?.winner ?? 'VILLAGERS')
const winnerTitle = computed(() => `${winner.value[0]}${winner.value.slice(1).toLowerCase()}`)
</script>

<template>
  <div class="col">
    <span>{{ winnerTitle }} won!</span>
    <RouterLink to="/"> leave game </RouterLink>
  </div>
</template>
