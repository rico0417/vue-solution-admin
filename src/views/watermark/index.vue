<template>
  <div>
    <el-button @click="setWatermark1('水印1')">水印1(默认)</el-button>
    <el-button @click="setWatermark2('水印2')">水印2(自定义)</el-button>
    <el-button @click="clear1">清除水印1</el-button>
    <el-button @click="clear2">清除水印2</el-button>
    <el-button @click="clearAll">清除全部水印</el-button>
  </div>
</template>

<script setup lang="ts">
import { useWatermark } from '@/hooks/useWatermark';
import { onUnmounted, ref } from 'vue';

defineOptions({
  name: 'Watermark'
});

const app = ref(document.body);

const { setWatermark: setWatermark1, clear: clear1, clearAll } = useWatermark();
const { setWatermark: setWatermark2, clear: clear2 } = useWatermark(app, {
  fontColor: 'red',
  fontSize: 20,
  rotate: 30
});

onUnmounted(() => {
  clearAll();
});
</script>

<style lang="scss" scoped></style>
