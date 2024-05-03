<template>
  <el-tooltip effect="dark" content="全屏" placement="bottom" :offset="15" :show-after="1000">
    <div class="universal-style" @click="handleFullScreen">
      <SvgIcon
        :name="isFullscreen ? 'noFullscreen' : 'fullscreen'"
        :icon-style="{ width: '18px', height: '18px' }"
      ></SvgIcon>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import screenfull from 'screenfull';

defineOptions({ name: 'Fullscreen' });

const isFullscreen = ref(screenfull.isFullscreen);

// 侦听事件
const change = () => {
  isFullscreen.value = screenfull.isFullscreen;
};

// 设置侦听器
onMounted(() => {
  screenfull.on('change', change);
});

// 移除侦听器
onUnmounted(() => {
  screenfull.off('change', change);
});

const handleFullScreen = () => {
  screenfull.toggle();
};
</script>

<style lang="scss" scoped>
@import '../styles/iconStyle.scss';
</style>
