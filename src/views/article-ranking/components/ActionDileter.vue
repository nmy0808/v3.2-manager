<template>
  <el-checkbox-group v-model='roleData'>
    <el-checkbox v-for='item in columnLabels' :key='item' :label='item' />
  </el-checkbox-group>

</template>

<script setup>
import { selectColumns, columnLabels } from '../dynamic'

const roleData = selectColumns
const roleList = columnLabels

</script>

<style lang='scss' scoped></style>
