<template>
  <el-table
    :data='permissionList'
    border
    size='large'
    row-key='id'
    :tree-props='{children: "children"}'
  >
    <el-table-column label='权限名称' prop='permissionName' align='left' width='150'></el-table-column>
    <el-table-column label='权限标识' prop='permissionMark' width='350'></el-table-column>
    <el-table-column label='权限描述' prop='permissionDesc'></el-table-column>
  </el-table>
</template>

<script setup>
import { inject } from 'vue'
// 权限列表
const permissionList = inject('permissionList')
</script>

<style lang='scss' scoped></style>
