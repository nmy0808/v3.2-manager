<template>
  <el-table :data='tableData' border size='mini' v-if='tableColumns'>
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
import { defineProps } from 'vue'

const props = defineProps({
  tableData: Array
})

const onToPageDetail = (row) => {
}
const onDelete = (row) => {
}
</script>

<style lang='scss' scoped></style>
