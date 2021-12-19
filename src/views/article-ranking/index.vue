<template>
  <div class='article-rating-page'>
    <action-filter />
    <rating-table :tableData='articleList' />
    <el-pagination
      v-model:currentPage='page'
      :page-sizes='[10, 20, 30, 40]'
      :page-size='size'
      layout='total, sizes, prev, pager, next, jumper'
      :total='total'
      @size-change='handleSizeChange'
      @current-change='handleCurrentChange'
    >
    </el-pagination>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'
import { getArticleListApi } from '@/api/article'
import RatingTable from '@/views/article-ranking/components/RatingTable'
import ActionFilter from '@/views/article-ranking/components/ActionFilter'

// provide: 刷新文章列表
provide('getArticleList', getArticleList)

// page: 分页
const page = ref(1)
const size = ref(10)
const total = ref(10)
// data: 当前文章列表
const articleList = ref(null)

// 初始化获取文章列表
getArticleList()

const handleSizeChange = (targetSize) => {
  size.value = targetSize
  getArticleList()
}
const handleCurrentChange = () => {
  getArticleList()
}

// api: 请求文章列表
async function getArticleList () {
  articleList.value = []
  const data = await getArticleListApi({
    page: page.value,
    size: size.value
  })
  articleList.value = data.list
  page.value = +data.page
  size.value = +data.size
  total.value = +data.total
}
</script>

<style lang='scss' scoped></style>
