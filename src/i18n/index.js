import { createI18n } from 'vue-i18n/dist/vue-i18n.cjs.prod'
import en from './lang/en'
import zh from './lang/zh'
import store from '@/store'

// 1. 创建 messages 数据源
const messages = {
  en: {
    msg: {
      ...en
    }
  },
  zh: {
    msg: {
      ...zh
    }
  }
}
// 2. locale 语言变量
const locale = store.getters.language

// 3. 初始化 i18n 实例
const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale,
  messages
})

export default i18n
