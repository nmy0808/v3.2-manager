export default {
  namespaced: true,
  state: () => ({
    // 侧导航开关
    sidebarOpened: true
  }),
  mutations: {
    // 切换侧导航开关
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    }
  },
  actions: {}
}
