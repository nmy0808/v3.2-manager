import axios from 'axios'
import { ElMessage } from 'element-plus'
import storage from '@/utils/storage'
import constants from '@/constants'
import store from '@/store'
import { isCheckLoginTimeout, setLoginTimeStamp } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 3000
})
// 添加请求拦截器
service.interceptors.request.use((config) => {
  const token = storage.getItem(constants.TOKEN)
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
    isCheckLoginTimeout()
  }
  return config
})
// 添加响应拦截器
service.interceptors.response.use(function(response) {
  const {
    success,
    data,
    message
  } = response.data
  if (success) {
    return data
  } else {
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  }
}, async function(error) {
  const {
    code,
    message
  } = error.response.data
  // token 超时
  if (code === 401) {
    // 清除登录状态
    // 返回登录
    await store.dispatch('user/loginOut')
    // TODO 清除权限
  }
  ElMessage.error(message || error.message)
  return Promise.reject(error)
})
//
const request = (options) => {
  if (options.method === 'get') {
    options.params = options.data
    delete options.data
  }
  return service(options)
}
// request 支持['get', 'post', 'put', 'delete']
const methods = ['get', 'post', 'put', 'delete']
methods.forEach(method => {
  request[method] = (url, data, options = {}) => {
    return request({
      method,
      url,
      data,
      ...options
    })
  }
})
export default request
