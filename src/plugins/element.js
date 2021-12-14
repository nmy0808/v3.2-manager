import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import store from '@/store'
import { computed } from 'vue'

const currentLocale = computed(() => store.getters.language === 'zh' ? zhCn : en)

export default (app) => {
  app.use(ElementPlus, { locale: currentLocale.value })
}
