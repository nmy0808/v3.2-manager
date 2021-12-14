import request from '@/utils/request'
import md5 from 'md5'

/**
 * 登录
 * @param params  {Object} { username, password:md5加密 }
 * @returns {Promise<void>}
 */
export async function loginApi (params) {
  params.password = md5(params.password)
  return request.post('/sys/login', params)
}

/**
 * 获取用户信息
 * @returns {Promise<*>}
 */
export async function getUserInfoApi () {
  return request.get('/sys/profile')
}
