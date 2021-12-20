import request from '@/utils/request'

/**
 * 获取所有文章
 * @returns {Promise<*>}
 */
export async function getArticleListApi (params) {
  return request.get('/article/list', params)
}

/**
 * 修改文章排名
 * @param params {Object}
 * initRanking   最初排名
 * finalRanking  最终排名
 * @returns {Promise<*>}
 */
export async function getArticleSortApi (params) {
  return request.post('/article/sort', params)
}

/**
 * 创建文章
 * @param params {Object} {title, content}
 * @returns {Promise<*>}
 */
export async function createArticleApi (params) {
  return request.post('/article/create', params)
}

/**
 * 编辑文章详情
 * @param params {Object} id,title,content
 * @returns {Promise<*>}
 */
export async function editArticleApi (params) {
  return request.post('/article/edit', params)
}

/**
 * 获取文章详情
 * @param id
 * @returns {Promise<*>}
 */
export async function getArticleDetailApi (id) {
  return request.get('/article/' + id)
}

/**
 * 删除文章
 * @param id
 * @returns {Promise<*>}
 */
export async function deleteArticleByIdApi (id) {
  return request.get('/article/delete/' + id)
}
