import request from '@/utils/request'

/**
 * 获取项目功能
 * @returns {Promise<*>}
 */
export async function getFeatureApi () {
  return request.get('/user/feature')
}

/**
 * 获取项目章节
 * @returns {Promise<*>}
 */
export async function getChapterApi () {
  return request.get('/user/chapter')
}

/**
 * 新增员工（Excel 导入)
 * @param params {Object} excelData
 * @returns {Promise<*>}
 */
export async function getUserMangeImportApi (params) {
  return request.post('/user-manage/batch/import', params)
}
