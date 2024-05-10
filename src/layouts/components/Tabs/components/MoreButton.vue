<template>
  <el-dropdown trigger="click" :teleported="false" @visible-change="showChange">
    <div class="more-button">
      <el-icon>
        <component :is="showType ? 'ArrowUpBold' : 'ArrowDownBold'"></component>
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="refresh">
          <el-icon><Refresh /></el-icon>{{ $t('tabs.refresh') }}
        </el-dropdown-item>
        <el-dropdown-item @click="maximize">
          <el-icon><FullScreen /></el-icon>{{ $t('tabs.maximize') }}
        </el-dropdown-item>
        <el-dropdown-item divided @click="closeCurrentTab">
          <el-icon><Remove /></el-icon>{{ $t('tabs.closeCurrent') }}
        </el-dropdown-item>
        <el-dropdown-item @click="tabStore.closeTabsOnSide(route.fullPath, 'left')">
          <el-icon><DArrowLeft /></el-icon>{{ $t('tabs.closeLeft') }}
        </el-dropdown-item>
        <el-dropdown-item @click="tabStore.closeTabsOnSide(route.fullPath, 'right')">
          <el-icon><DArrowRight /></el-icon>{{ $t('tabs.closeRight') }}
        </el-dropdown-item>
        <el-dropdown-item divided @click="tabStore.closeMultipleTab(route.fullPath)">
          <el-icon><CircleClose /></el-icon>{{ $t('tabs.closeOther') }}
        </el-dropdown-item>
        <el-dropdown-item @click="closeAllTab">
          <el-icon><FolderDelete /></el-icon>{{ $t('tabs.closeAll') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { inject, nextTick, ref } from 'vue';
import { HOME_URL } from '@/config';
import { useTabsStore } from '@/stores/modules/tabs';
import { useGlobalStore } from '@/stores/modules/global';
import { useKeepAliveStore } from '@/stores/modules/keepAlive';
import { useRoute, useRouter } from 'vue-router';

defineOptions({ name: 'MoreButton' });

const route = useRoute();
const router = useRouter();
const tabStore = useTabsStore();
const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();

// refresh current page
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

// maximize current page
const maximize = () => {
  globalStore.setGlobalState('maximize', true);
};

// Close Current
const closeCurrentTab = () => {
  if (route.meta.isAffix) return;
  tabStore.removeTabs(route.fullPath);
};

// Close All
const closeAllTab = () => {
  tabStore.closeMultipleTab();
  router.push(HOME_URL);
};

const showType = ref(false);
const showChange = (type) => {
  showType.value = type;
};
</script>

<style scoped lang="scss">
.el-dropdown {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  .more-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 43px;
    cursor: pointer;
    border-left: 1px solid var(--el-border-color-light);
    transition: all 0.3s;
    &:hover {
      background-color: var(--el-color-info-light-9);
    }
    .iconfont {
      font-size: 12.5px;
    }
  }
}
</style>
