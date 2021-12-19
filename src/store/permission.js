import router, { publicRoutes, privateRoutes } from '@/router'

export default {
  namespaced: true,
  state: () => {
    return {
      routes: publicRoutes
    }
  },
  mutations: {
    setRoutes (state, routes = []) {
      state.routes = [...publicRoutes, ...routes]
    }
  },
  actions: {
    generateRoutes (ctx) {
      const userInfo = ctx.rootGetters.userInfo
      if (userInfo && userInfo.permission && userInfo.permission.menus) {
        const menus = userInfo.permission.menus
        const routes = privateRoutes.filter(item => {
          return menus.find(it => it === item.name)
        })
        // 增加私有路由
        routes.forEach(r => {
          router.addRoute(r)
        })
        // 最后增加404
        router.addRoute({
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('@/views/error-page/404')
        })
        // 保存到vuex
        ctx.commit('setRoutes', routes)
        // 返回当前私有路由
        return Promise.resolve(routes)
      }
      return Promise.reject(new Error('私有路由初始化失败 router/permission.js'))
    }
  }
}
