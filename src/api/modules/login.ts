import axios from '@/api';

// 用户登录
export const loginApi = (params: any) => {
  return axios.post<any>(`/auth/login`, params, { loading: false });
};

// 获取菜单列表
export const getAuthMenuListApi = () => {
  return axios.get<any>(`/auth/authMenuList`, {}, { loading: false });
};
