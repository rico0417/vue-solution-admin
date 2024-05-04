import { defineStore } from 'pinia';
import { getAuthMenuListApi } from '@/api/modules/login';
import { getFlatMenuList, getShowMenuList, getAllBreadcrumbList } from '@/utils/routerUtils';

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
    flatMenuListGet: (state) => getFlatMenuList(state.authMenuList),
    // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
    showMenuListGet: (state) => getShowMenuList(state.authMenuList),
    // 递归处理后的所有面包屑导航列表
    breadcrumbListGet: (state) => getAllBreadcrumbList(state.authMenuList)
  },
  actions: {
    async getAuthMenuList() {
      const { data } = await getAuthMenuListApi();
      this.authMenuList = data;
    }
  }
});
