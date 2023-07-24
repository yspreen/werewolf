<template>
  <div class="spinner">
    <img src="wheel.svg" alt="" />
  </div>
</template>

<style scoped lang="scss">
.spinner {
  width: 7.8rem;
  height: 7.8rem;
  animation: spin 3s linear infinite;
  position: relative;

  img {
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
  }
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
