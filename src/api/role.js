import request from '@/utils/request'

/**
 * 获取角色列表
 * @returns {Promise<*>}
 */
export async function getRoleListApi () {
  return request.get('/role/list')
}
