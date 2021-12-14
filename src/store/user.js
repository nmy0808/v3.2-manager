import { getUserInfoApi, loginApi } from '@/api/sys'
import storage from '@/utils/storage'
import constants from '@/constants'
import router from '@/router'
import { setLoginTimeStamp } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => {
    return {
      token: storage.getItem(constants.TOKEN) || '',
      userInfo: {}
    }
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
      setLoginTimeStamp()
      storage.setItem(constants.TOKEN, payload)
    },
    setUserInfo (state, payload) {
      state.userInfo = payload
      storage.setItem(constants.USERINFO, payload)
    }
  },
  actions: {
    // 登录
    async login (ctx, payload) {
      try {
        const { token } = await loginApi(payload)
        ctx.commit('setToken', token)
      } catch (err) {
        return Promise.reject(err)
      }
    },
    // 根据token获取当前用户信息
    async getUserInfo (ctx, payload) {
      try {
        const data = await getUserInfoApi()
        ctx.commit('setUserInfo', data)
      } catch (err) {
        return Promise.reject(err)
      }
    },
    // 退出登录
    loginOut (ctx) {
      ctx.commit('setToken', '')
      ctx.commit('setUserInfo', {})
      storage.clearAll()
      router.push('/login')
    }
  }
}
