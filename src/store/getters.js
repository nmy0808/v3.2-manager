import variable from '@/assets/styles/variable.scss'

export default {
  isHasUserInfo (state) {
    return !(JSON.stringify(state.user.userInfo) === '{}')
  },
  token (state) {
    return state.user.token
  },
  // css样式变量
  cssVar: state => variable,
  // 侧导航开关
  sidebarOpened: state => state.app.sidebarOpened,
  // 国际化
  language: state => state.app.language
}
