<template>
  <el-breadcrumb class='breadcrumb' separator='/'>
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <template v-for='(item,index) in list' :key='item.meta.title'>
      <!--最后一个面包屑不需要跳转链接-->
      <el-breadcrumb-item :to='item.path' v-if='index < list.length-1'>{{ item.meta.title }}</el-breadcrumb-item>
      <el-breadcrumb-item class='no-redirect' v-else>{{ item.meta.title }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const list = computed(() => {
  return route.matched.filter(it => it.meta.title && it.meta.icon)
})
</script>

<style lang='scss' scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  ::v-deep(.no-redirect) {
    .el-breadcrumb__inner {
      color: #97a8be;
      cursor: text;
    }
  }
}
</style>
