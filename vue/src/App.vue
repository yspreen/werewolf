<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
body {
  font-family: 'Inter';
}
div {
  margin: 0;
  padding: 0;
}
.col {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
</style>
