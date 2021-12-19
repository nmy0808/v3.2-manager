import store from '@/store'

/**
 * 指定 'permission' 如果没有权限会隐藏该元素
 */
export default {
  mounted (el, { value }) {
    const points = store.getters?.userInfo?.permission?.points
    if (points) {
      const flag = points.some(item => item === value)
      if (!flag) {
        // eslint-disable-next-line no-unused-expressions
        el.parentNode?.removeChild(el)
      }
    }
  }
}
