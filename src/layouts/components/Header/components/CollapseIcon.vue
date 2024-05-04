<template>
  <el-icon class="collapse-icon" @click="changeCollapse">
    <component :is="globalStore.isCollapse ? 'expand' : 'fold'"></component>
  </el-icon>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/modules/global';

defineOptions({ name: 'CollapseIcon' });

const globalStore = useGlobalStore();
const changeCollapse = () => globalStore.setGlobalState('isCollapse', !globalStore.isCollapse);
</script>

<style lang="scss" scoped>
.collapse-icon {
  margin-right: 20px;
  font-size: 22px;
  cursor: pointer;
}
</style>
