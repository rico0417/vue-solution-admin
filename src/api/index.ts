import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/components/Loading/fullScreen'
import { LOGIN_URL } from '@/config'
import { ElMessage } from 'element-plus'
import type { ResultData, CustomAxiosRequestConfig } from '@/api/interface'
import { checkStatus } from './utils/checkStatus'
import { AxiosCanceler } from './utils/axiosCancel'
import { useUserStore } from '@/stores/modules/user'
import { router } from '@/routers'

const config = {
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 30000,
  // 跨域时候允许携带凭证
  withCredentials: true
}

const userStore = useUserStore()

const axiosCanceler = new AxiosCanceler()

class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)

    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        /**
         * 重复请求如果不设置的话，默认取消
         * 如果需要主动控制的话，在api服务中通过指定的第三个参数：{ cancel: false }
         * 来控制
         */
        if (config.cancel == null) {
          config.cancel = true
        }
        // 如果config.cancel = true的话，该接口每一次请求都会被记录在Map中用来作重复请求取消比对
        config.cancel && axiosCanceler.addPending(config)
        /**
         * Loading如果不设置的话，默认显示loading
         * 如果需要主动控制的话，在api服务中通过指定的第三个参数：{ loading: false } 来控制
         */
        if (config.loading == null) {
          config.loading = true
        }
        config.loading && showFullScreenLoading()
        if (config.headers && typeof config.headers.set === 'function') {
          config.headers.set('x-access-token', userStore.token)
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response
        const userStore = useUserStore()
        axiosCanceler.removePending(config)
        tryHideFullScreenLoading()
        // 登录失效
        if (data.code == 401) {
          userStore.setToken('')
          router.replace(LOGIN_URL)
          ElMessage.error(data.msg)
          return Promise.reject(data)
        }
        // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
        if (data.code && data.code !== 200) {
          ElMessage.error(data.msg)
          return Promise.reject(data)
        }
        // 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        return data
      },
      async (error: AxiosError) => {
        const { response } = error
        tryHideFullScreenLoading()
        // 请求超时 && 网络错误单独判断，没有 response
        if (error.message.indexOf('timeout') !== -1) ElMessage.error('请求超时！请您稍后重试')
        if (error.message.indexOf('Network Error') !== -1) ElMessage.error('网络错误！请您稍后重试')
        // 根据服务器响应的错误状态码，做不同的处理
        if (response) {
          const textStr = checkStatus(response.status)
          ElMessage.error(textStr)
        }
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) router.replace('/500')
        return Promise.reject(error)
      }
    )
  }

  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object | string, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object })
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: 'blob' })
  }
}

export default new RequestHttp(config)
