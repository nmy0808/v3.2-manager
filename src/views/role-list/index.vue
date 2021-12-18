<template>
  <div class='role-list-page'>
    <el-card>
      <el-table :data='roleSourceData' border size='mini'>
        <el-table-column label='序号' prop='id' width='50'></el-table-column>
        <el-table-column label='名称' prop='title' align='left' width='150'></el-table-column>
        <el-table-column label='描述' prop='describe'></el-table-column>
        <el-table-column label='操作' #default='{row}'>
          <el-button type='primary' @click='onSetPermission(row)' size='mini'>分配权限</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <Teleport to='body'>
      <role-dialog v-model='roleDialogVisible' :id='currentRoleId' />
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getRoleListApi } from '@/api/role'
import RoleDialog from '@/views/role-list/components/RoleDialog'

// isShow: 配置角色窗口显示
const roleDialogVisible = ref(false)
const roleSourceData = ref(null)
const currentRoleId = ref(null)
getRoleList()

const onSetPermission = (row) => {
  currentRoleId.value = row.id
  roleDialogVisible.value = true
}

async function getRoleList () {
  roleSourceData.value = await getRoleListApi()
}
</script>

<style lang='scss' scoped></style>
