<template>
  <el-card class='user-action-container'>
    <el-button type='primary' @click='onToPage' v-permission='`importUser`'>excel导入</el-button>
    <el-button type='success' @click='importVisible=true'>excel导出</el-button>
  </el-card>
  <Teleport to='body'>
    <export2-excel v-model='importVisible' />
  </Teleport>
</template>

<script setup>
import router from '@/router'
import Export2Excel from '@/views/user-manage/components/Export2Excel'
import { ref } from 'vue'

const onToPage = () => {
  router.push({ name: 'importUser' })
}

const importVisible = ref(false)
</script>

<style lang='scss' scoped>
.user-action-container {
  display: flex;
  justify-content: right;
}
</style>
