<template>
  <template v-for='item in routes' :key='item.path'>
    <!-- 子集 menu 菜单 -->
    <el-sub-menu v-if='item.children && item.children.length>0' :index='item.path'>
      <template #title>
        <menu-item :title='item.meta.title' :icon='item.meta.icon' v-if='item.meta.icon'></menu-item>
      </template>
      <!-- 递归-->
      <SidebarItem :routes='item.children'></SidebarItem>
    </el-sub-menu>
    <!-- 具体菜单项 -->
    <el-menu-item :index='item.path' v-else>
      <menu-item :title='item.meta.title' :icon='item.meta.icon' v-if='item.meta.icon'></menu-item>
    </el-menu-item>
  </template>
</template>

<script setup>
import { defineProps } from 'vue'
import MenuItem from '@/views/layout/sidebar/MenuItem'

const props = defineProps({
  routes: {
    type: Array,
    required: true
  }
})
</script>

<style lang='scss' scoped></style>
