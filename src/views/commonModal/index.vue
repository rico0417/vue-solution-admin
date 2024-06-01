<template>
  <div>
    <el-button @click="myDialog({ title: '父组件弹窗', draggable: true })">打开弹窗(可拖拽)</el-button>
  </div>
</template>

<script setup lang="ts">
import { useModal } from '@/hooks/useModal';
import MyDialog from './components/MyDialog.vue';

defineOptions({
  name: 'CommonModal'
});

const myDialog = useModal(MyDialog);
</script>

<style lang="scss" scoped></style>
