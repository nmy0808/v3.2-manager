/**
 * 记录登录时间
 */
import storage from '@/utils/storage'
import constants from '@/constants'

export const setLoginTimeStamp = () => {
  storage.setItem(constants.TIME_STAMP, Date.now())
}
/**
 * 获取登录时间
 * @returns {*}
 */
export const getLoginTimeStamp = () => {
  return storage.getItem(constants.TIME_STAMP)
}
/**
 * 是否token超时
 */
export const isCheckLoginTimeout = () => {
  const loginTime = getLoginTimeStamp()
  const currentTime = Date.now()
  return currentTime - loginTime > constants.TOKEN_TIMEOUT_VALUE
}
