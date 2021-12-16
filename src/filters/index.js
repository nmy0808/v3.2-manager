import dayjs from 'dayjs'

const formatDate = (val, format = 'YYYY-MM-DD') => {
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
    formatPhone
  }
}
