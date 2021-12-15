import storage from '@/utils/storage'
import constants from '@/constants'
import variable from '@/assets/styles/variable.scss'

export default {
  namespaced: true,
  state: () => {
    return {
      themeColor: storage.getItem(constants.THEME) || variable.menuBg
    }
  },
  mutations: {
    setThemeColor (state, payload) {
      state.themeColor = payload
      storage.setItem(constants.THEME, payload)
    }
  },
  actions: {}
}
