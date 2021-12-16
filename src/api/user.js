import request from '@/utils/request'
/**
 * 获取项目功能
 * @returns {Promise<*>}
 */
export async function getFeatureApi() {
  return request.get('/user/feature')
}
/**
 * 获取项目章节
 * @returns {Promise<*>}
 */
export async function getChapterApi() {
  return request.get('/user/chapter')
}
