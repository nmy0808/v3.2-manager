import storage from '@/utils/storage'
import constants from '@/constants'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
import { generateTitle } from '@/utils/lang'

export default {
  namespaced: true,
  state: () => ({
    // 侧导航开关
    sidebarOpened: true,
    // 国际化
    language: storage.getItem(constants.LANGUAGE) || 'zh',
    // tagsView
    tagsView: storage.getItem(constants.TAGS_VIEW) || []
  }),
  mutations: {
    // 切换侧导航开关
    triggerSidebarOpened (state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    // 设置国际化
    setLanguage (state, payload) {
      state.language = payload
      storage.setItem(constants.LANGUAGE, payload)
      ElMessage.success(i18n.global.t('msg.toast.switchLangSuccess'))
    },
    // 添加tagsView
    addTagsView (state, route) {
      const writes = ['/login', '/404', '/401']
      if (writes.includes(route.fullPath)) return
      const target = state.tagsView.find(it => it.fullPath === route.fullPath)
      // 判断: 重复的不要
      if (target) return
      // 添加
      route.title = generateTitle(route.meta.title)
      state.tagsView.push(route)

      storage.setItem(constants.TAGS_VIEW, state.tagsView)
    },
    // 删除单个tagsView项
    deleteOneTagsView (state, route) {
      const index = state.tagsView.findIndex(it => it.fullPath === route.fullPath)
      state.tagsView.splice(index, 1)
      storage.setItem(constants.TAGS_VIEW, state.tagsView)
    },
    // 设置/覆盖tagsView
    setTagsView (state, payload) {
      console.log(123)
      state.tagsView = payload
      storage.setItem(constants.TAGS_VIEW, state.tagsView)
    }
  },
  actions: {
    // 切换所有tagsView项的i18n
    switchI18nTagsView (ctx) {
      const newTagsView = ctx.state.tagsView.map(item => {
        return {
          ...item,
          title: generateTitle(item.meta.title)
        }
      })
      ctx.commit('setTagsView', newTagsView)
    }
  }
}
