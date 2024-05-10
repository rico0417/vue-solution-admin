<template>
  <div class="maximize flx-center" @click="exitMaximize">
    <SvgIcon class="close-icon" name="fullClose" :icon-style="{ width: '18px', height: '18px' }"></SvgIcon>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/modules/global';

defineOptions({ name: 'Maximize' });

const globalStore = useGlobalStore();
const exitMaximize = () => {
  globalStore.setGlobalState('maximize', false);
};
</script>

<style scoped lang="scss">
.maximize {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 999;
  width: 44px;
  height: 44px;
  cursor: pointer;
  background-color: var(--el-color-info);
  border-radius: 50%;
  opacity: 0.38;
  &:hover {
    background-color: var(--el-color-info-dark-2);
  }
}
</style>
