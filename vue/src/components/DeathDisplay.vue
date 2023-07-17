<script lang="ts" setup>
import { isDead, store } from '@/service/store'
</script>

<template>
  <div class="row mt-1" v-if="store.room?.diedTonight.length && store.room.nightCycle === 0">
    These people died tonight:
    {{ store.room?.diedTonight.map((userId) => store.users[userId].name).join(', ') }}
  </div>
  <div class="row mt-1" v-if="isDead || store.room?.diedTonight.includes(store.user?.userId ?? '')">
    You died 💀 <a href="/"> leave game </a>
  </div>
</template>
