<script setup lang="ts">
import { api } from '@/service/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const router = useRouter()

async function submit() {
  await api.post('/name', {
    name: name.value
  })
  await router.push('/')
}
</script>

<template>
  <div class="col">
    <form @submit.prevent="submit">
      <div class="row">
        <input
          v-model="name"
          @submit.prevent="submit"
          type="text"
          name="given-name"
          id="given-name"
          placeholder="Harry Styles"
        />
        <button @click="submit">ok</button>
      </div>
      <span class="sm"
        >using your real name helps the other people in the room identify who joined :)</span
      >
    </form>
  </div>
</template>

<style scoped></style>
