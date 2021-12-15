import { createStore } from 'vuex'
import user from '@/store/user'
import app from '@/store/app'
import theme from '@/store/theme'
import getters from '@/store/getters'

export default createStore({
  state: {},
  getters: {
    ...getters
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    app,
    theme
  }
})
