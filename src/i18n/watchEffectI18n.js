import { watch } from 'vue'
import store from '@/store'

/**
 * 监听国际化
 * @param fns
 */
export const watchEffectI18n = (...fns) => {
  watch(() => store.getters.language, (currLang) => {
    fns.forEach((fn) => {
      fn(currLang)
    })
  })
}
