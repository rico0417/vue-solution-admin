import { defineStore } from 'pinia';
import piniaPersistConfig from '@/stores/plugins/persist';
import { DEFAULT_PRIMARY } from '@/config';

export const useGlobalStore = defineStore({
  id: 'solution-global',
  // 修改默认值之后，需清除 localStorage 数据
  state: (): any => ({
    // 布局模式 (纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns)
    layout: 'vertical',
    // element 组件大小
    assemblySize: 'default',
    // 当前系统语言
    language: null,
    // 当前页面是否全屏
    maximize: false,
    // 主题颜色
    primary: DEFAULT_PRIMARY,
    // 深色模式
    isDark: false,
    // 灰色模式
    isGrey: false,
    // 色弱模式
    isWeak: false,
    // 侧边栏反转
    asideInverted: false,
    // 头部反转
    headerInverted: false,
    // 水印展示
    isWaterMark: false,
    // 折叠菜单
    isCollapse: false,
    // 菜单手风琴
    accordion: true,
    // 面包屑导航
    breadcrumb: true,
    // 面包屑导航图标
    breadcrumbIcon: true,
    // 标签页
    tabs: true,
    // 标签页图标
    tabsIcon: true,
    // 页脚
    footer: true,
    // 主题设置
    themeSettings: false
  }),
  getters: {},
  actions: {
    setGlobalState(key: string, value: any) {
      this.$patch((state: any) => {
        state[key] = value;
      });
    },
    setThemeSettings(value: any) {
      this.themeSettings = value;
    }
  },
  persist: piniaPersistConfig('solution-global')
});
