<template>
  <el-tooltip effect="dark" content="系统设置" placement="bottom" :offset="15" :show-after="1000">
    <div class="universal-style" @click="openDrawer">
      <SvgIcon name="systemSettings" :icon-style="{ width: '18px', height: '18px' }"></SvgIcon>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/modules/global';

defineOptions({ name: 'SystemSettings' });

const globalStore = useGlobalStore();
const openDrawer = () => {
  globalStore.setThemeSettings(!globalStore.themeSettings);
};
</script>

<style lang="scss" scoped>
@import '../styles/iconStyle.scss';
</style>
