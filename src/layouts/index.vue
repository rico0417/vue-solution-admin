<template>
  <suspense>
    <template #default>
      <component :is="LayoutComponents[layout]" />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </suspense>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, type Component } from 'vue';
import { useGlobalStore } from '@/stores/modules/global';
import Loading from '@/components/Loading/index.vue';

defineOptions({
  name: 'Layout'
});

const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);

const LayoutComponents: Record<any, Component> = {
  vertical: defineAsyncComponent(() => import('./template/LayoutVertical/index.vue'))
};
</script>

<style lang="scss" scoped>
.layout {
  // 浏览器最小压缩宽度为600px，当小于该像素，界面不再压缩（出现滚动条）
  min-width: 600px;
}
</style>
