import { defineStore } from 'pinia'
import piniaPersistConfig from '@/stores/plugins/persist'

export const useUserStore = defineStore({
  id: 'solution-user',
  state: (): any => ({
    token: '',
    userInfo: {}
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    }
  },
  persist: piniaPersistConfig('solution-user')
})
