<template>
  <el-card class='user-table-container'>
    <el-table :data='tableData' style='width: 100%' border>
      <el-table-column type='index' label='#' />
      <el-table-column prop='username' label='姓名' />
      <el-table-column prop='mobile' label='联系方式' #default='{row}'>
        {{ $filters.formatPhone(row.mobile) }}
      </el-table-column>
      <el-table-column prop='avatar' label='头像' #default='{row}'>
        <el-image :src='row.avatar' :preview-src-list='[row.avatar]'></el-image>
      </el-table-column>
      <el-table-column prop='role' label='角色' #default='{row}' width='300'>
        <el-tag v-for='item in row.role' :key='item' size='mini'>
          {{ item.title }}
        </el-tag>
      </el-table-column>
      <el-table-column prop='openTime' label='开通时间' #default='{row}'>
        {{ $filters.formatDate(row.openTime) }}
      </el-table-column>
      <el-table-column label='操作' fixed='right' #default='{row}' width='500'>
        <el-button size='mini' type='primary'>查看</el-button>
        <el-button size='mini' type='info'>角色</el-button>
        <el-button size='mini' type='danger' @click='onDeleteOneUserManage(row)'>删除</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { inject, ref } from 'vue'
import { deleteUserManageByIdApi } from '@/api/user-manage'
import { ElMessage, ElMessageBox } from 'element-plus'

const loading = ref(false)
// 事件源
const tableData = inject('tableData')
// 方法: 刷新用户列表
const getUserMangeList = inject('getUserMangeList')

// 事件: 删除用户
const onDeleteOneUserManage = async (item) => {
  if (loading.value) return
  // 弹窗询问
  ElMessageBox({
    title: '删除用户',
    message: <span>是否要删除姓名为<span style='color: red;'>{item.username}</span>的用户?</span>,
    type: 'warning',
    boxType: 'confirm',
    showCancelButton: true
  })
    .then(async () => {
      loading.value = true
      // 请求: 根据id删除用户
      await deleteUserManageByIdApi(item._id)
      await getUserMangeList()
      ElMessage.success('删除成功')
      loading.value = false
    })
    .catch(() => {
    })
}
</script>

<style lang='scss' scoped>
.user-table-container {
  .el-image {
    width: 40px;
    height: 40px;
  }

  .el-tag {
    margin-right: 10px;
  }
}
</style>
