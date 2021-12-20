<template>
  <ElConfigProvider :locale='locale'>
    <router-view></router-view>
  </ElConfigProvider>
</template>

<script>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { computed } from 'vue'
import store from '@/store'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

export default {
  name: 'App',
  components: {},
  setup () {
    const locale = computed(() => store.getters.language === 'en' ? en : zhCn)
    //
    initElementTheme()

    // 初始化element主题色
    function initElementTheme () {
      generateNewStyle(store.getters.themeColor).then(style => {
        writeNewStyle(style)
      })
    }

    return {
      locale
    }
  }
}
</script>

<style>
</style>
