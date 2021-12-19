<template>
  <el-table :data='tableData' border size='mini' v-if='tableColumns' ref='tableRef'>
    <el-table-column v-for='item in tableColumns' v-bind='item' :key='item.label'>
      <template v-if='item.prop === "publicDate"' #default='{row}'>
        {{ $filters.relativeTime(row.publicDate) }}
      </template>
      <template v-else-if='item.prop === "action"' #default='{row}'>
        <el-button type='primary' @click='onToPageDetail(row)' size='mini'>查看</el-button>
        <el-button type='primary' @click='onDelete(row)' size='mini'>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { tableColumns } from '../dynamic'
import { defineProps, inject, onMounted, ref } from 'vue'
import router from '@/router'
import { initSortable, tableRef } from '../sortable'
import { ElMessage, ElMessageBox } from 'element-plus'
import i18n from '@/i18n'
import { deleteArticleByIdApi, getArticleSortApi } from '@/api/article'
// inject: 刷新文章列表
const getArticleList = inject('getArticleList')

// data
const props = defineProps({
  tableData: Array
})

onMounted(() => {
  initSortable(props.tableData, async (event) => {
    const {
      newIndex,
      oldIndex
    } = event
    // 修改数据
    await getArticleSortApi({
      initRanking: props.tableData[oldIndex].ranking,
      finalRanking: props.tableData[newIndex].ranking
    })
    ElMessage.success({
      message: i18n.global.t('msg.article.sortSuccess'),
      type: 'success'
    })
    // 直接重新获取数据无法刷新 table！！
    getArticleList()
  })
})
// 事件: 跳转到文章详情
const onToPageDetail = (row) => {
  router.push('/article/' + row._id)
}
const onDelete = async (row) => {
  const id = row._id
  // 弹窗询问
  ElMessageBox({
    title: '删除文章',
    message: <span>删除标题为<span style='color: red;'>{row.label}</span>的文章?</span>,
    type: 'warning',
    boxType: 'confirm',
    showCancelButton: true
  })
    .then(async () => {
      await deleteArticleByIdApi(id)
      getArticleList()
      ElMessage.success('删除成功')
    })
    .catch(() => {
    })
}
</script>

<style lang='scss' scoped>
::v-deep .sortable-ghost {
  opacity: 0.6;
  color: #fff !important;
  background: #304156 !important;
}
</style>
