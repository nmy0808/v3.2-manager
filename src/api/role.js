import request from '@/utils/request'

/**
 * 获取角色列表
 * @returns {Promise<*>}
 */
export async function getRoleListApi () {
  return request.get('/role/list')
}

/**
 * 设置指定用户的角色
 */
export async function getSetUserRoleByIdApi ({
  userId,
  roles
}) {
  return request.post('/user-manage/update-role/' + userId, { roles: roles.filter(it => it) })
}

/**
 * 获取指定角色权限
 * @param userId
 * @returns {Promise<*>}
 */
export async function getPermissionByIdApi (userId) {
  return request.get('/user-manage/role/' + userId)
}
