<script setup lang="ts">
import { watch } from 'vue'
import { RouterView } from 'vue-router'
import { store } from './service/store'
import RoleInfo from './components/RoleInfo.vue'

watch(store, (val) => {
  if (val.nightMode) {
    document.body.classList.add('night')
  } else {
    document.body.classList.remove('night')
  }
})
</script>

<template>
  <router-view />
  <role-info />
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

body {
  display: flex;
  place-items: center;
}

#app {
  display: flex;
  width: 100%;
  padding: 0 2rem;
}

body,
input,
textarea {
  font-size: 20pt;
}

@media screen and (max-width: 400px) {
  body,
  input,
  textarea {
    font-size: 16pt;
  }
}
@media screen and (max-width: 320px) {
  body,
  input,
  textarea {
    font-size: 12pt;
  }
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
  align-items: center;
}
.btn,
input {
  color: unset;
  background-color: white;
  border: 1px solid black;
  border-radius: 0.4em;
  padding: 0.4em 0.6em;
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
.pt-05 {
  padding-top: 0.5em;
}
.mt-05 {
  margin-top: 0.5em;
}
.pb-05 {
  padding-bottom: 0.5em;
}
.mb-05 {
  margin-bottom: 0.5em;
}
.pl-1 {
  padding-left: 1em;
}
.ml-1 {
  margin-left: 1em;
}
.pr-1 {
  padding-right: 1em;
}
.mr-1 {
  margin-right: 1em;
}
.pl-05 {
  padding-left: 0.5em;
}
.ml-05 {
  margin-left: 0.5em;
}
.pr-05 {
  padding-right: 0.5em;
}
.mr-05 {
  margin-right: 0.5em;
}
.sm {
  font-size: 0.8em;
}
</style>
