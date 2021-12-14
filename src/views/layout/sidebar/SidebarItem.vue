<template>
  <template v-for='item in routes' :key='item.path'>
    <!-- 子集 menu 菜单 -->
    <el-submenu v-if='routes.children'>
      <template #title>
        <i class='el-icon-location'></i>
        <span>{{ item.meta.title }}</span>
      </template>
      <template v-for='it in item.children' :key='it.path'>
        <el-menu-item :index='it.path'>{{ it.meta.title }}</el-menu-item>
      </template>
    </el-submenu>
    <!-- 具体菜单项 -->
    <el-menu-item :index='item.path' v-else>
      <i class='el-icon-setting'></i>
      <template #title>{{ item.meta.title }}</template>
    </el-menu-item>
  </template>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  routes: {
    type: Array,
    required: true
  }
})
</script>

<style lang='scss' scoped></style>
