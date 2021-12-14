<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <transition-group name="breadcrumb">
      <!--最后一个面包屑不需要跳转链接-->
      <el-breadcrumb-item v-for="(item, index) in list" :key="item.meta.title">
        <router-link :to="item.path" v-if="index < list.length - 1">
          {{ item.meta.title }}
        </router-link>
        <span class="no-redirect" v-else>
          {{ item.meta.title }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
// 当前路由matched的列表
const list = computed(() => {
  return route.matched.filter((it) => it.meta.title && it.meta.icon)
})
</script>

<style lang='scss' scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
