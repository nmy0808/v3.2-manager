<template>
  <div class='user-manage-page'>
    <user-action />
    <user-table />
    <el-pagination
      v-model:currentPage='page'
      :page-sizes='[2, 10, 20, 40]'
      :page-size='10'
      layout='total, sizes, prev, pager, next, jumper'
      :total='total'
      @size-change='onSizeChange'
      @current-change='onCurrentChange'
    >
    </el-pagination>
  </div>
</template>

<script setup>
import UserAction from '@/views/user-manage/components/user-action'
import UserTable from '@/views/user-manage/components/user-table'
import { onActivated, provide, ref, watch } from 'vue'
import { getUserManageListApi } from '@/api/user-manage'

const tableData = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)
provide('tableData', tableData)
provide('getUserMangeList', getUserMangeList)

getUserMangeList()

const onSizeChange = (targetSize) => {
  size.value = targetSize
}
const onCurrentChange = (targetPage) => {
  page.value = targetPage
}
watch([page, size], () => {
  getUserMangeList()
})
onActivated(() => {
  getUserMangeList()
})

async function getUserMangeList () {
  const {
    list,
    total: resTotal
  } = await getUserManageListApi({
    page: page.value,
    size: size.value
  })
  tableData.value = list
  total.value = resTotal
}
</script>

<style lang='scss' scoped>
.user-manage-page {
  .user-table-container{
    margin-top: 20px;
  }
  ::v-deep .el-pager {
    li:not(.active) {
      color: #999999;
    }
  }
}
</style>
