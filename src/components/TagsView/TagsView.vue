<template>
  <div class='tag-view-container'>
    <div class='tag-item' v-for='item in tagsView' :key='item' :class='[isActive(item)?"active":null]'
         @click='onSelectItem(item)'
         @contextmenu.prevent='openMenu($event,item)'
         :style='[isActive(item)?itemActiveStyle:""]'
    >
      {{ item.title }}
      <svg-icon icon='close' class='tag-close-icon' @click.stop='onClose(item)' v-if='!isActive(item)'></svg-icon>
    </div>
    <context-menu v-model='menuVisible' :position='menuPosition' :current-tag='currentItem' />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import store from '@/store'
import { useRoute } from 'vue-router'
import router from '@/router'
import { watchEffectI18n } from '@/i18n/watchEffectI18n'
import ContextMenu from '@/components/ContextMenu/ContextMenu'

const route = useRoute()
// css: 全局css变量
const cssVars = computed(() => store.getters.cssVar)
// css: 单项激活的样式对象
const itemActiveStyle = computed(() => {
  return {
    background: cssVars.value.menuBg,
    color: '#ffffff'
  }
})
// vuex: tagsView 列表
const tagsView = computed(() => store.getters.tagsView)
// 监听: 监听路由并添加到vuex中
watch(route, () => {
  store.commit('app/addTagsView', JSON.parse(JSON.stringify(route)))
}, { immediate: true })
// 监听回调: 监听国际化切换
watchEffectI18n(() => {
  store.dispatch('app/switchI18nTagsView')
})
// 事件: 关闭某一个tag
const onClose = (item) => {
  store.commit('app/deleteOneTagsView', item)
}
// 事件: 点击选择了tag
const onSelectItem = (item) => {
  router.push(item.fullPath)
}
// 方法: 判断当前tag是否为激活状态
const isActive = (item) => {
  return item.fullPath === route.fullPath
}

// model属性: 显示右键菜单组件
const menuVisible = ref(false)
// 定位: 当前右键tag所记录的定位信息
const menuPosition = ref({
  x: 0,
  y: 0
})
// 当前右键选中的tag
const currentItem = ref(null)
// 事件: 打开contextMenu组件
const openMenu = (e, item) => {
  menuPosition.value.x = e.x
  menuPosition.value.y = e.y
  currentItem.value = item
  menuVisible.value = true
}
</script>

<style lang='scss' scoped>
.tag-view-container {
  padding: 10px 0;
  display: flex;
  align-items: center;

  .tag-close-icon {
    font-size: 10px;
    position: absolute;
    right: 6px;
    top: 50%;
    margin-top: -5px;
  }

  .tag-item {
    padding: 6px 18px;
    border: 1px solid #d8dce5;
    box-sizing: border-box;
    min-width: 70px;
    position: relative;
    margin: 0 3px;
    color: #747784;
    cursor: pointer;
    font-size: 14px;
    border-radius: 2px;

    &.active {
      border: none;

      &::after {
        content: '';
        width: 6px;
        height: 6px;
        position: absolute;
        left: 6px;
        top: 50%;
        margin-top: -3px;
        display: block;
        background: #ffffff;
        border-radius: 50%;
      }
    }
  }
}
</style>
