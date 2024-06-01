<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
        <el-tab-pane
          v-for="item in tabsMenuList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :closable="item.close"
        >
          <template #label>
            <div class="w-full h-full flex items-center" @contextmenu="onContextMenu($event, item)">
              <el-icon v-if="item.icon && tabsIcon" class="tabs-icon">
                <component :is="item.icon"></component>
              </el-icon>
              {{ item.title }}
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
      <TabContextMenu v-model:show="show" :options="options" :is-right-click-tab="isRightClickTab"></TabContextMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sortable from 'sortablejs';
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/modules/global';
import { useTabsStore } from '@/stores/modules/tabs';
import { useAuthStore } from '@/stores/modules/auth';
import { TabsPaneContext, TabPaneName } from 'element-plus';
import TabContextMenu from './components/TabContextMenu.vue';

defineOptions({ name: 'TabsIndex' });

const route = useRoute();
const router = useRouter();
const tabStore = useTabsStore();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

const tabsMenuValue = ref(route.fullPath);
const tabsMenuList = computed(() => tabStore.tabsMenuList);
const tabsIcon = computed(() => globalStore.tabsIcon);

onMounted(() => {
  tabsDrop();
  initTabs();
});

const show = ref(false);
const options = ref({
  x: 0,
  y: 0,
  theme: ''
});

const isRightClickTab = ref(false);
const onContextMenu = (e: MouseEvent, item) => {
  e.preventDefault();
  isRightClickTab.value = route.path === item.path;
  //Set the mouse position
  options.value.x = e.x;
  options.value.y = e.y;
  options.value.theme = `${globalStore.rightClickTheme} ${globalStore.isDark ? 'dark' : ''}`;
  //Show menu
  show.value = true;
};

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull) return;
    tabsMenuValue.value = route.fullPath;
    const tabsParams = {
      icon: route.meta.icon as string,
      title: route.meta.title as string,
      path: route.fullPath,
      name: route.name as string,
      close: !route.meta.isAffix,
      isKeepAlive: route.meta.isKeepAlive as boolean
    };
    tabStore.addTabs(tabsParams);
  },
  { immediate: true }
);

// 初始化需要固定的 tabs
const initTabs = () => {
  authStore.flatMenuListGet.forEach((item) => {
    if (item.meta.isAffix && !item.meta.isHide && !item.meta.isFull) {
      const tabsParams = {
        icon: item.meta.icon,
        title: item.meta.title,
        path: item.path,
        name: item.name,
        close: !item.meta.isAffix,
        isKeepAlive: item.meta.isKeepAlive
      };
      tabStore.addTabs(tabsParams);
    }
  });
};

// tabs 拖拽排序
const tabsDrop = () => {
  Sortable.create(document.querySelector('.el-tabs__nav') as HTMLElement, {
    draggable: '.el-tabs__item',
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      const tabsList = [...tabStore.tabsMenuList];
      const currRow = tabsList.splice(oldIndex as number, 1)[0];
      tabsList.splice(newIndex as number, 0, currRow);
      tabStore.setTabs(tabsList);
    }
  });
};

// Tab Click
const tabClick = (tabItem: TabsPaneContext) => {
  const fullPath = tabItem.props.name as string;
  router.push(fullPath);
};

// Remove Tab
const tabRemove = (fullPath: TabPaneName) => {
  tabStore.removeTabs(fullPath as string, fullPath == route.fullPath);
};
</script>

<style lang="scss" scoped>
.tabs-box {
  background-color: var(--el-bg-color);
  .tabs-menu {
    position: relative;
    width: 100%;
    :deep(.el-tabs) {
      .el-tabs__header {
        box-sizing: border-box;
        height: 40px;
        padding: 0 10px;
        margin: 0;
        .el-tabs__nav-wrap {
          position: absolute;
          width: calc(100% - 70px);
          .el-tabs__nav {
            display: flex;
            border: none;
            .el-tabs__item {
              display: flex;
              align-items: center;
              justify-content: center;
              color: #afafaf;
              border: none;
              .tabs-icon {
                margin: 1.5px 4px 0 0;
                font-size: 15px;
              }
              .is-icon-close {
                margin-top: 1px;
              }
              &.is-active {
                color: var(--el-color-primary);
                &::before {
                  position: absolute;
                  bottom: 0;
                  width: 100%;
                  height: 0;
                  content: '';
                  border-bottom: 2px solid var(--el-color-primary) !important;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
