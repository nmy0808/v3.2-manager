<template>
  <ElConfigProvider :locale='locale'>
    <router-view />
  </ElConfigProvider>
</template>

<script>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { computed } from 'vue'
import store from '@/store'

export default {
  name: 'App',
  components: {},
  setup () {
    const locale = computed(() => store.getters.language === 'en' ? en : zhCn)
    return {
      locale
    }
  }
}
</script>

<style>
</style>
