<script setup lang="ts">
import { watch } from 'vue'
import { RouterView } from 'vue-router'
import { store } from './service/store'

watch(store, (val) => {
  if (val.nightMode) {
    document.body.classList.add('night')
  } else {
    document.body.classList.remove('night')
  }
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
body.night {
  background: black;
  color: #fff9ed;
}

#app {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: hsl(202, 100%, 37%);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(202, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: flex;
    width: 100%;
    padding: 0 2rem;
  }
}

body,
input,
textarea {
  font-family: 'Inter';
  font-size: 18pt;
}
div {
  margin: 0;
  padding: 0;
}
.full-width,
.col,
.row {
  width: 100%;
}
.col {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.btn,
input {
  color: unset;
  background-color: white;
  border: 1px solid black;
  border-radius: 0.5em;
  padding: 0.5em 0.75em;
  font-size: 1em;
  cursor: pointer;
  &.danger {
    background-color: #c9c9c9;
  }
  body.night & {
    background-color: #ffffff40;
    border-color: #fff9ed;
  }
}
input {
  border-width: 2px;
}
*:focus {
  outline: none;
}
.semi-transparent,
.btn.danger {
  opacity: 0.4;
}
.pt-1 {
  padding-top: 1em;
}
.mt-1 {
  margin-top: 1em;
}
.pb-1 {
  padding-bottom: 1em;
}
.mb-1 {
  margin-bottom: 1em;
}
.sm {
  font-size: 0.8em;
}
</style>
