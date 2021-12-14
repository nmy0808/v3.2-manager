import store from '@/store'
import router from '@/router'
// 白名单
const whites = ['login', '404']
// 1.token存在, 无法访问login, 会跳到首页
// 2.token不存在, 只能访问白名单
router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  if (token) {
    if (to.name === 'login') {
      next('/')
    } else {
      // 判断: 获取用户信息
      if (!store.getters.isHasUserInfo) {
        await store.dispatch('user/getUserInfo')
      }
      console.log(to.name)
      next()
    }
  } else {
    if (whites.includes(to.name)) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
})
