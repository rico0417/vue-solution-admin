<template>
  <Maximize v-show="maximize" />
  <Tabs v-show="tabs" />
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveName">
          <component :is="Component" v-if="isRouterShow" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
  <el-footer v-show="footer">
    <Footer />
  </el-footer>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, provide, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useDebounceFn } from '@vueuse/core';
import { useGlobalStore } from '@/stores/modules/global';
import { useKeepAliveStore } from '@/stores/modules/keepAlive';
import Maximize from './components/Maximize.vue';
import Tabs from '@/layouts/components/Tabs/index.vue';
import Footer from '@/layouts/components/Footer/index.vue';

defineOptions({ name: 'MainIndex' });

const globalStore = useGlobalStore();
const { maximize, isCollapse, tabs, footer } = storeToRefs(globalStore);

const keepAliveStore = useKeepAliveStore();
const { keepAliveName } = storeToRefs(keepAliveStore);

// 注入刷新页面方法
const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);
provide('refresh', refreshCurrentPage);

// 监听当前页面是否最大化，动态添加 class
watch(
  () => maximize.value,
  () => {
    const app = document.getElementById('app') as HTMLElement;
    if (maximize.value) app.classList.add('main-maximize');
    else app.classList.remove('main-maximize');
  },
  { immediate: true }
);

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth;
  if (!isCollapse.value && screenWidth.value < 1200) globalStore.setGlobalState('isCollapse', true);
  if (isCollapse.value && screenWidth.value > 1200) globalStore.setGlobalState('isCollapse', false);
}, 100);
window.addEventListener('resize', listeningWindow, false);
onBeforeUnmount(() => {
  window.removeEventListener('resize', listeningWindow);
});
</script>

<style scoped lang="scss">
.el-main {
  box-sizing: border-box;
  padding: 10px 12px;
  overflow-x: hidden;
  background-color: var(--el-bg-color-page);
}
.el-footer {
  height: auto;
  padding: 0;
}
</style>
