<script setup lang="ts">
import { onMounted } from 'vue'
import TheSpinner from './TheSpinner.vue'
import { useRouter } from 'vue-router'
import { loadUser } from '@/service/loadUser'

const router = useRouter()

onMounted(async () => {
  const user = await loadUser(true)
  if (user?.name) {
    router.push('/rooms')
  } else {
    router.push('/set-name')
  }
})
</script>

<template>
  <div class="col">
    <the-spinner />
  </div>
</template>

<style scoped>
.col {
  align-items: center;
}
</style>
