<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :collapse='!$store.getters.sidebarOpened'
    :uniqueOpened='true'
    :background-color='$store.getters.cssVar.menuBg'
    :text-color='$store.getters.cssVar.menuText'
    :active-text-color='$store.getters.cssVar.menuActiveText'
    :default-active='currentPath'
    router
  >
    <sidebar-item :routes='routes'></sidebar-item>
  </el-menu>

</template>
<script setup>
import { useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/router'
import { computed } from 'vue'
import SidebarItem from '@/views/layout/sidebar/SidebarItem'
import store from '@/store'

// 路由
const router = useRouter()
// 数组: 整理好的路由菜单项
const routes = computed(() => {
  // 获取当前共有路由+私有路由列表 (vuex)
  const currentRoutes = store.getters.routes
  const filterRoutes = filterRouters(currentRoutes)
  return generateMenus(filterRoutes)
})
// 属性: 当前路由的path
const currentPath = computed(() => {
  return router.currentRoute.value.path
})

</script>
