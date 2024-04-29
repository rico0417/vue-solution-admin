<template>
  <el-container>
    <el-aside>aside</el-aside>
    <el-container>
      <el-header>header</el-header>
      <Main />
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Main from '@/layouts/components/Main/index.vue';
defineOptions({
  name: 'LayoutVertical'
});
</script>

<style lang="scss" scoped></style>
