<script setup lang="ts">
import { api } from '@/service/api'
import { store } from '@/service/store'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const router = useRouter()

let didSubmitName = ''
async function submit() {
  if (didSubmitName === name.value) return
  didSubmitName = name.value
  await api.post('/name', {
    name: name.value
  })
  await router.push('/')
}

onMounted(() => {
  store.users = {}
  store.user = null
})
</script>

<template>
  <div class="col">
    <form @submit.prevent.stop="submit">
      <div class="row">
        <input
          v-model="name"
          type="text"
          name="given-name"
          id="given-name"
          placeholder="Harry Styles"
        />
        <button class="btn" @click="submit">ok</button>
      </div>
      <span class="sm"
        >using your real name helps the other people in the room identify who joined :)</span
      >
    </form>
  </div>
</template>

<style scoped>
input {
  width: 100%;
  margin-right: 0.5em;
}
</style>
