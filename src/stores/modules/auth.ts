import { defineStore } from 'pinia';
import { getAuthMenuListApi } from '@/api/modules/login';
import { getFlatMenuList } from '@/utils/routerUtils';

export const useAuthStore = defineStore({
  id: 'solution-auth',
  state: (): any => ({
    // 菜单权限列表
    authMenuList: []
  }),
  getters: {
    // 菜单权限列表
    authMenuListGet: (state) => state.authMenuList,
    // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
    flatMenuListGet: (state) => getFlatMenuList(state.authMenuList)
  },
  actions: {
    async getAuthMenuList() {
      const { data } = await getAuthMenuListApi();
      this.authMenuList = data;
    }
  }
});
