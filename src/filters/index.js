import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'
import zhCn from 'dayjs/locale/zh-cn'
import en from 'dayjs/locale/en'
import store from '@/store'
// 加载相对时间插件
dayjs.extend(rt)

/**
 * 计算相对时间
 * @param val
 * @returns {string}
 */
function relativeTime (val) {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  const lang = store.getters.language
  return dayjs().locale(lang === 'en' ? en : zhCn).to(dayjs(val))
}

export const formatDate = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}
const formatPhone = (val) => {
  if (!val) {
    return ''
  }
  const res = (val + '').split('')
  res.splice(3, 4, '****')
  return res.join('')
}
export const installGlobalFilters = app => {
  app.config.globalProperties.$filters = {
    formatDate,
    formatPhone,
    relativeTime
  }
}
