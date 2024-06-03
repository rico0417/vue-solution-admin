<template>
  <context-menu v-model:show="show" :options="options">
    <context-menu-item label="菜单1" @click="demo1">
      <template #icon>
        <el-icon><Refresh /></el-icon>
      </template>
    </context-menu-item>
    <context-menu-item label="菜单2">
      <template #icon>
        <el-icon><FullScreen /></el-icon>
      </template>
    </context-menu-item>
    <context-menu-separator></context-menu-separator>
    <context-menu-item label="菜单3">
      <template #icon>
        <el-icon><Remove /></el-icon>
      </template>
    </context-menu-item>
    <context-menu-item label="菜单4">
      <template #icon>
        <el-icon><DArrowLeft /></el-icon>
      </template>
    </context-menu-item>
    <context-menu-item label="菜单5">
      <template #icon>
        <el-icon><DArrowRight /></el-icon>
      </template>
    </context-menu-item>
    <context-menu-separator></context-menu-separator>
    <context-menu-item label="菜单6">
      <template #icon>
        <el-icon><CircleClose /></el-icon>
      </template>
    </context-menu-item>
    <context-menu-item label="菜单7">
      <template #icon>
        <el-icon><CircleCloseFilled /></el-icon>
      </template>
    </context-menu-item>
    <context-menu-group label="更多菜单">
      <template #icon>
        <el-icon><CircleCloseFilled /></el-icon>
      </template>
      <context-menu-item label="菜单8">
        <template #icon>
          <el-icon><CircleClose /></el-icon>
        </template>
      </context-menu-item>
      <context-menu-item label="菜单9">
        <template #icon>
          <el-icon><CircleCloseFilled /></el-icon>
        </template>
      </context-menu-item>
    </context-menu-group>
  </context-menu>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TabContextMenuDemo1'
});

const show = defineModel('show');

interface TabContextMenuDemo1 {
  options: any;
}

defineProps<TabContextMenuDemo1>();

const demo1 = () => {
  alert('我是demo1');
};
</script>

<style lang="scss" scoped></style>
