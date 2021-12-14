import storage from '@/utils/storage'
import constants from '@/constants'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

export default {
  namespaced: true,
  state: () => ({
    // 侧导航开关
    sidebarOpened: true,
    // 国际化
    language: storage.getItem(constants.LANGUAGE) || 'zh'
  }),
  mutations: {
    // 切换侧导航开关
    triggerSidebarOpened (state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    // 设置国际化
    setLanguage (state, payload) {
      state.language = payload
      storage.setItem(constants.LANGUAGE, payload)
      ElMessage.success(i18n.global.t('msg.toast.switchLangSuccess'))
    }
  },
  actions: {}
}
