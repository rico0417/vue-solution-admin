<template>
  <context-menu v-model:show="show" :options="options">
    <template v-if="isRightClickTab">
      <context-menu-item :label="$t('tabs.refresh')" @click="refresh">
        <template #icon>
          <el-icon><Refresh /></el-icon>
        </template>
      </context-menu-item>
      <context-menu-item :label="$t('tabs.maximize')" @click="maximize">
        <template #icon>
          <el-icon><FullScreen /></el-icon>
        </template>
      </context-menu-item>
      <context-menu-separator></context-menu-separator>
    </template>
    <context-menu-item :label="$t('tabs.closeCurrent')" @click="closeCurrentTab">
      <template #icon>
        <el-icon><Remove /></el-icon>
      </template>
    </context-menu-item>
    <context-menu-item :label="$t('tabs.closeLeft')" @click="closeLeftSide">
      <template #icon>
        <el-icon><DArrowLeft /></el-icon>
      </template>
    </context-menu-item>
    <context-menu-item :label="$t('tabs.closeRight')" @click="closeRightSide">
      <template #icon>
        <el-icon><DArrowRight /></el-icon>
      </template>
    </context-menu-item>
    <context-menu-separator></context-menu-separator>
    <context-menu-item :label="$t('tabs.closeOther')" @click="closeOtherWindows">
      <template #icon>
        <el-icon><CircleClose /></el-icon>
      </template>
    </context-menu-item>
    <context-menu-item :label="$t('tabs.closeAll')" @click="closeAllTab">
      <template #icon>
        <el-icon><CircleCloseFilled /></el-icon>
      </template>
    </context-menu-item>
  </context-menu>
</template>

<script setup lang="ts">
import { inject, nextTick, computed, toRefs } from 'vue';
import { HOME_URL } from '@/config';
import { useTabsStore } from '@/stores/modules/tabs';
import { useGlobalStore } from '@/stores/modules/global';
import { useKeepAliveStore } from '@/stores/modules/keepAlive';
import { useRoute, useRouter } from 'vue-router';

defineOptions({
  name: 'TabContextMenu'
});

const show = defineModel('show');

interface TabContextMenuProps {
  options: any;
  rightClickData: any;
}

const props = defineProps<TabContextMenuProps>();
const { options, rightClickData } = toRefs(props);

const route = useRoute();
const router = useRouter();
const tabStore = useTabsStore();
const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();

const isRightClickTab = computed(() => {
  return route.path === rightClickData.value.path;
});

const rightClickTargetPath = computed(() => {
  return rightClickData?.value?.path || '';
});

// 刷新
const refreshCurrentPage: any = inject('refresh');
const refresh = () => {
  setTimeout(() => {
    /**
     * 判断当前路由是否支持keep-alive，如若支持，先将其从keep-alive列表里移除，
     * 隐藏
     * 再将其从新添加到keep-alive列表里
     * 显示
     */
    route.meta.isKeepAlive && keepAliveStore.removeKeepAliveName(route.name as string);
    refreshCurrentPage(false);
    nextTick(() => {
      route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.name as string);
      refreshCurrentPage(true);
    });
  }, 0);
};

// 最大化
const maximize = () => {
  globalStore.setGlobalState('maximize', true);
};

// 关闭选择
const closeCurrentTab = () => {
  if (!rightClickData.value.close) return;
  const path = rightClickTargetPath.value;
  tabStore.removeTabs(path, path === route.fullPath);
};

// 关闭全部
const closeAllTab = () => {
  tabStore.closeMultipleTab();
  router.push(HOME_URL);
};

// 关闭左侧
const closeLeftSide = () => {
  const path = rightClickTargetPath.value;
  tabStore.closeTabsOnSide(path, 'left', path === route.fullPath);
};
// 关闭右侧
const closeRightSide = () => {
  const path = rightClickTargetPath.value;
  tabStore.closeTabsOnSide(path, 'right', path === route.fullPath);
};
// 关闭其它
const closeOtherWindows = () => {
  const path = rightClickTargetPath.value;
  tabStore.closeMultipleTab(path, path === route.fullPath);
};
</script>

<style lang="scss" scoped></style>
