<template>
  <div class="loading-box">
    <div class="loader"></div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "Loading" });
</script>

<style scoped lang="scss">
.loading-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.loader {
  --primary-color: no-repeat linear-gradient(var(--el-color-primary) 0 0);

  width: 45px;
  aspect-ratio: 1;
  background:
    var(--primary-color) 0% 50%,
    var(--primary-color) 50% 50%,
    var(--primary-color) 100% 50%;
  background-size: 20% 100%;
  animation: l1 1s infinite linear;
}

@keyframes l1 {
  0% {
    background-size:
      20% 100%,
      20% 100%,
      20% 100%;
  }
  33% {
    background-size:
      20% 10%,
      20% 100%,
      20% 100%;
  }
  50% {
    background-size:
      20% 100%,
      20% 10%,
      20% 100%;
  }
  66% {
    background-size:
      20% 100%,
      20% 100%,
      20% 10%;
  }
  100% {
    background-size:
      20% 100%,
      20% 100%,
      20% 100%;
  }
}
</style>
