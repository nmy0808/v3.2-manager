<template>
  <div class='permission-page'>
    <el-card>
      <permission-table />
    </el-card>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'
import { getPermissionListApi } from '@/api/permission'
import PermissionTable from '@/views/permission-list/components/PermissionTable'

const permissionList = ref(null)
provide('permissionList', permissionList)
getPermissionList()

async function getPermissionList () {
  permissionList.value = await getPermissionListApi()
}

</script>

<style lang='scss' scoped></style>
