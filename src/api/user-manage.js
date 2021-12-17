import request from '@/utils/request'

/**
 * 获取员工列表
 * @param params {Object} page:页码,size:每页条数
 * @returns {Promise<*>}
 */
export async function getUserManageListApi (params) {
  return request.get('/user-manage/list', params)
}

/**
 * 获取所有员工列表
 * @returns {Promise<*>}
 */
export async function getUserManageAllListApi () {
  return request.get('/user-manage/all-list')
}

/**
 * 删除员工
 * @param id 员工id
 * @returns {Promise<*>}
 */
export async function deleteUserManageByIdApi (id) {
  return request.get('/user-manage/detele/' + id)
}

/**
 * 根据id获取员工详情
 * @param id
 * @returns {Promise<*>}
 */
export async function getUserManageInfoByIdApi (id) {
  return request.get('/user-manage/detail/' + id)
}
