import { filterRouters, getChildrenRoutes } from '@/utils/router'
import router from '@/router'
import i18n from '@/i18n'

/**
 * 生成fuse数据源
 * @returns {[]} 返回fuse格式数组, [{title: ['a','ab'], path:''}, { ... }]
 */
export const generateFuseData = () => {
  const routes = filterRouters(router.getRoutes())
  return formatRoutes(routes)
}
/**
 * 格式化路由列表格式
 * @param routes 路由列表
 * @returns {[]}
 */
const formatRoutes = (routes) => {
  const result = []
  const deep = (routes, preTitle) => {
    routes.forEach((item) => {
      // 1.没有meta 2.没有title 3.动态路由(包含':'符号)
      // 都直接返回
      if (!item.meta || !item.meta.title || item.path.includes(':')) return
      const temp = {
        title: [],
        path: item.path
      }
      // 转换国际化
      const itemTitle = i18n.global.t(`msg.route.${item.meta.title}`)
      if (preTitle) {
        temp.title = [...preTitle, itemTitle]
      } else {
        temp.title = [itemTitle]
      }
      result.push(temp)
      if (item.children && item.children.length) {
        deep(item.children, temp.title)
      }
    })
  }
  deep(routes)
  return result
}
