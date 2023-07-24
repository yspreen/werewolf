<template>
  <div class="marquee">
    <p>{{ props.message }} {{ props.message }} {{ props.message }} {{ props.message }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  message: String
})
</script>

<style scoped>
.marquee p {
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  animation: marquee 10s linear infinite;
}

@keyframes marquee {
  0% {
    text-indent: 0;
  }
  100% {
    text-indent: -100%;
  }
}
</style>
