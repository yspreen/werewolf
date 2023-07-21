<script setup lang="ts">
import { roleName, stringToRole } from '@/models/role'
import { myRole, store } from '@/service/store'
import { computed, ref } from 'vue'

const reveal = ref(false)

const myRoleName = computed(() => roleName(myRole.value))

let revealTimer = null as NodeJS.Timeout | null
function toggleReveal() {
  revealTimer && clearTimeout(revealTimer)
  reveal.value = !reveal.value
  if (reveal.value) {
    revealTimer = setTimeout(() => {
      toggleReveal()
    }, 5000)
  }
}

function showHelp() {
  store.showRoleInfo = stringToRole(myRole.value)
}
</script>

<template>
  <div class="full-width" v-if="reveal">
    My Role:
    <a href="javascript:void(0)" class="ml-05 pr-05" @click="showHelp">{{ myRoleName }}</a>
    <span class="help" @click="showHelp">?</span>
  </div>
  <div class="row" v-else>My Role: &lt; reveal below &gt;</div>
  <div class="row">
    <button class="btn" @click="toggleReveal()">toggle role visibility</button>
  </div>
</template>

<style scoped lang="scss">
a {
  color: unset;
  background: unset;
  text-decoration: underline;
}
span.help {
  font-size: 0.7em;
  font-family: sans-serif;
  // border: 1px solid black;
  display: inline-flex;
  width: 1em;
  height: 1em;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  cursor: pointer;
  font-weight: 800;
  transform: translateY(-0.15em);

  background-color: black;
  color: white;

  body.night & {
    color: black;
    background-color: #fff9ed;
  }
}
</style>
