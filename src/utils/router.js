/**
 * 返回所有子路由
 */
export const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}
/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
export const filterRouters = routes => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter(route => {
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}
/**
 * 根据 routes 数据，返回对应 menu 规则数组
 */
export const generateMenus = (routes) => {
  const result = []
  routes.forEach(route => {
    const { meta } = route
    const { children } = route
    // 1 判断: 如果meta和children为空直接返回
    if (isNull(meta) && isNull(children)) return
    // 2 判断: 如果meta为空, children有值
    if (isNull(meta) && !isNull(children)) {
      result.push(...generateMenus(children))
      return
    }
    // 3 判断: 如果meta和children都有值
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let targetRoute = result.find(it => it.path === route.path)
    if (!targetRoute) {
      targetRoute = {
        ...route,
        children: []
      }
      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(targetRoute)
      }
    }
    // 存在 children 进入迭代到children
    if (route.children) {
      targetRoute.children.push(...generateMenus(route.children))
    }
  })
  return result
}

/**
 * 判断数据是否为空值
 */
function isNull (data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}
