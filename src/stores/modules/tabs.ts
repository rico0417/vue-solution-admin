import { router } from '@/routers';
import { defineStore } from 'pinia';
import { useKeepAliveStore } from './keepAlive';
import piniaPersistConfig from '@/stores/plugins/persist';

const keepAliveStore = useKeepAliveStore();

export const useTabsStore = defineStore({
  id: 'solution-tabs',
  state: (): any => ({
    tabsMenuList: []
  }),
  actions: {
    // Add Tabs
    async addTabs(tabItem) {
      // 避免重复添加tab进入列表中，需要做去重判断
      if (!this.tabsMenuList.some((item) => item.path === tabItem.path)) {
        this.tabsMenuList.push(tabItem);
      }
      // add keepalive
      if (!keepAliveStore.keepAliveName.includes(tabItem.name) && tabItem.isKeepAlive) {
        keepAliveStore.addKeepAliveName(tabItem.name);
      }
    },
    // Remove Tabs
    async removeTabs(tabPath: string, isCurrent: boolean = true) {
      if (isCurrent) {
        // 如果移除的是当前的tab，则需要锁定下一个高亮的tab，并跳转到对应的路由页面
        this.tabsMenuList.forEach((item, index) => {
          if (item.path !== tabPath) return;
          // 向前或向后移动一位
          const nextTab = this.tabsMenuList[index + 1] || this.tabsMenuList[index - 1];
          // 如果找不到就跳出本次循环
          if (!nextTab) return;
          router.push(nextTab.path);
        });
      }
      // remove keepalive
      const tabItem = this.tabsMenuList.find((item) => item.path === tabPath);
      tabItem?.isKeepAlive && keepAliveStore.removeKeepAliveName(tabItem.name);
      // set tabs
      this.tabsMenuList = this.tabsMenuList.filter((item) => item.path !== tabPath);
    },
    // Close Tabs On Side
    async closeTabsOnSide(path: string, type: 'left' | 'right', isCurrent = false) {
      const currentIndex = this.tabsMenuList.findIndex((item) => item.path === path);
      if (currentIndex !== -1) {
        const range = type === 'left' ? [0, currentIndex] : [currentIndex + 1, this.tabsMenuList.length];
        this.tabsMenuList = this.tabsMenuList.filter((item, index) => {
          return index < range[0] || index >= range[1] || !item.close;
        });
      }
      // set keepalive
      const KeepAliveList = this.tabsMenuList.filter((item) => item.isKeepAlive);
      keepAliveStore.setKeepAliveName(KeepAliveList.map((item) => item.name));
      if (!isCurrent) {
        const currentRoute = router.currentRoute;
        // 判断当前地址对应的tab是否还存在
        const isTabExit = this.tabsMenuList.find((item) => item.path === currentRoute.value.fullPath);
        if (isTabExit == null) {
          router.push(path);
        }
      }
    },
    // Close MultipleTab
    async closeMultipleTab(tabsMenuValue?: string, isCurrent: boolean = false) {
      const currentRoute = router.currentRoute;
      // 当前地址对应的tab是否是可删除的（isAffix)
      if (!isCurrent && tabsMenuValue && !currentRoute.value.meta.isAffix) {
        router.push(tabsMenuValue);
      }
      this.tabsMenuList = this.tabsMenuList.filter((item) => {
        return item.path === tabsMenuValue || !item.close;
      });
      // set keepalive
      const KeepAliveList = this.tabsMenuList.filter((item) => item.isKeepAlive);
      keepAliveStore.setKeepAliveName(KeepAliveList.map((item) => item.name));
    },
    // Set Tabs
    async setTabs(tabsMenuList) {
      this.tabsMenuList = tabsMenuList;
    }
  },
  persist: piniaPersistConfig('solution-tabs')
});
