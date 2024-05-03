<template>
  <el-tooltip effect="dark" content="查询" placement="bottom" :offset="15" :show-after="1000">
    <div class="universal-style">
      <SvgIcon name="search" :icon-style="{ width: '18px', height: '18px' }"></SvgIcon>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
defineOptions({ name: 'Search' });
</script>

<style lang="scss" scoped>
@import '../styles/iconStyle.scss';
</style>
