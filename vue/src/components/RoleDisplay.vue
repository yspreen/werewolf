<script setup lang="ts">
import { roleName } from '@/models/role'
import { store } from '@/service/store'
import { computed, ref } from 'vue'

const reveal = ref(false)

const myRole = computed(() => {
  return store.room?.givenRoles?.[store.user?.userId ?? ''] ?? 'UNKNOWN'
})

const myRoleName = computed(() => roleName(myRole.value))
const roleLabel = computed(() => (reveal.value ? myRoleName.value : '< reveal below >'))

let revealTimer = null as number | null
function toggleReveal() {
  revealTimer && clearTimeout(revealTimer)
  reveal.value = !reveal.value
  if (reveal.value) {
    revealTimer = setTimeout(() => {
      toggleReveal()
    }, 5000)
  }
}
</script>

<template>
  <div class="row">My Role: {{ roleLabel }}</div>
  <div class="row">
    <button class="btn" @click="toggleReveal()">toggle role visibility</button>
  </div>
</template>
