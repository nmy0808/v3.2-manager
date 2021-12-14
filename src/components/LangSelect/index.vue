<template>
  <el-dropdown class='language-dropdown' @command='handleCommand' trigger='click'>
    <span class='el-dropdown-link'>
         <el-tooltip
           :effect='effect'
           :content='$t("msg.guide.langDesc")'
           placement='bottom'
         >
            <svg-icon class='icon-language' icon='language'></svg-icon>
      </el-tooltip>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command='zh' :disabled='currLang === "zh"'>中文</el-dropdown-item>
        <el-dropdown-item command='en' :disabled='currLang === "en"'>English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n/dist/vue-i18n.esm-browser.prod'

defineProps({
  // tip文字提示的主题颜色 dark/light
  effect: {
    type: String,
    default: 'dark'
  }
})

const store = useStore()
const currLang = computed(() => store.getters.language)
const i18n = useI18n()
// 事件: 切换语言
const handleCommand = (lang) => {
  // 1.改变i18n语言包
  i18n.locale.value = lang
  // 2.改变vuex和本地storage
  store.commit('app/setLanguage', lang)
}
</script>

<style lang='scss' scoped>
.language-dropdown {
  margin-right: 20px;
}

.icon-language {
  font-size: 28px;
}
</style>
