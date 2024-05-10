<template>
  <div class="footer flx-center">
    <a href="https://github.com/rico0417/vue-solution-admin" target="_blank"> 2024 © Vue-solution-admin. </a>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'FooterIndex' });
</script>
<style lang="scss" scoped>
.footer {
  height: 30px;
  background-color: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color-light);
  a {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    text-decoration: none;
    letter-spacing: 0.5px;
  }
}
</style>
