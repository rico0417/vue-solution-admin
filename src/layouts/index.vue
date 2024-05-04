<template>
  <suspense>
    <template #default>
      <component :is="LayoutComponents[layout]" />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </suspense>
  <ThemeDrawer />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, type Component, watch } from 'vue';
import { useGlobalStore } from '@/stores/modules/global';
import Loading from '@/components/Loading/index.vue';
import ThemeDrawer from './components/ThemeDrawer/index.vue';

defineOptions({
  name: 'Layout'
});

const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);

const LayoutComponents: Record<any, Component> = {
  vertical: defineAsyncComponent(() => import('./template/LayoutVertical/index.vue')),
  classic: defineAsyncComponent(() => import('./template/LayoutClassic/index.vue')),
  transverse: defineAsyncComponent(() => import('./template/LayoutTransverse/index.vue')),
  columns: defineAsyncComponent(() => import('./template/LayoutColumns/index.vue'))
};

// 监听布局变化，在 body 上添加相对应的 class值（纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns）
watch(
  () => layout.value,
  () => {
    const body = document.body as HTMLElement;
    body.setAttribute('class', layout.value);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.layout {
  // 浏览器最小压缩宽度为600px，当小于该像素，界面不再压缩（出现滚动条）
  min-width: 600px;
}
</style>
