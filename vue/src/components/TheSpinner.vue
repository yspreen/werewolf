<template>
  <div class="spinner"></div>
</template>

<style scoped>
.spinner {
  border: 16px solid #00000020;
  border-top: 16px solid #000000;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
