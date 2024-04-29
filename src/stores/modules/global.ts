import { defineStore } from 'pinia';
import piniaPersistConfig from '@/stores/plugins/persist';

export const useGlobalStore = defineStore({
  id: 'solution-global',
  // 修改默认值之后，需清除 localStorage 数据
  state: (): any => ({
    // 布局模式 (纵向：vertical)
    layout: 'vertical'
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
