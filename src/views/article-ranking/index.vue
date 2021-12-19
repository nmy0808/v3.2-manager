<template>
  <div class='article-rating-page'>
    <action-dileter />
    <rating-table :tableData='articleList' />
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'
import { getArticleListApi } from '@/api/article'
import RatingTable from '@/views/article-ranking/components/RatingTable'
import ActionDileter from '@/views/article-ranking/components/ActionDileter'

// provide: 刷新文章列表
provide('getArticleList', getArticleList)

// page: 分页
const page = ref(null)
const size = ref(null)
const total = ref(null)
// data: 当前文章列表
const articleList = ref(null)

// 初始化获取文章列表
getArticleList()

// api: 请求文章列表
async function getArticleList () {
  const data = await getArticleListApi()
  articleList.value = data.list
  page.value = data.page
  size.value = data.size
  total.value = data.total
}
</script>

<style lang='scss' scoped></style>
