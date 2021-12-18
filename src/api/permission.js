import request from '@/utils/request'

/**
 * 获取指定角色的权限
 * @param {Object} roleId
 * @returns {Promise<*>}
 */
export async function getRoleByIdApi (roleId) {
  return request.get('/role/permission/' + roleId)
}

/**
 * 获取所有权限
 * @returns {Promise<*>}
 */
export async function getPermissionListApi () {
  return request.get('/permission/list')
}

/**
 * 为角色分配权限
 * @param params {Object}  permissions:角色权限["1", "1-1", "1-2", "1-3"]  roleId:角色ID
 * @returns {Promise<*>}
 */
export async function getDistributePermissionByIdApi (params) {
  return request.post('/role/distribute-permission', params)
}
