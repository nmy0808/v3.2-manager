import request from '@/utils/request'

/**
 * 获取所有文章
 * @returns {Promise<*>}
 */
export async function getArticleListApi () {
  return request.get('/article/list')
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
 * 获取文章详情
 * @param id
 * @returns {Promise<*>}
 */
export async function getArticleDetailApi (id) {
  return request.get('/article/' + id)
}
