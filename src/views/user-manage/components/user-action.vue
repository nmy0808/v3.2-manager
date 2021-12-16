<template>
  <el-card class='user-action-container'>
    <el-button type='primary' @click='onToPage'>excel导入</el-button>
    <el-button type='success'>excel导出</el-button>
  </el-card>
</template>

<script setup>
import router from '@/router'

const onToPage = () => {
  router.push({ name: 'import' })
}
</script>

<style lang='scss' scoped>
.user-action-container {
  display: flex;
  justify-content: right;
}
</style>
