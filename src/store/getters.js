import variable from '@/assets/styles/variable.scss'
import { generateColors } from '@/utils/theme'

export default {
  isHasUserInfo (state) {
    return !(JSON.stringify(state.user.userInfo) === '{}')
  },
  token (state) {
    return state.user.token
  },
  // css样式变量
  cssVar: state => {
    return {
      ...variable,
      ...generateColors(state.theme.themeColor)
    }
  },
  // 侧导航开关
  sidebarOpened: state => state.app.sidebarOpened,
  // 国际化
  language: state => state.app.language,
  // 主题颜色
  themeColor: state => state.theme.themeColor
}
