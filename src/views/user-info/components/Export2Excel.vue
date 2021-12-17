<template>
  <div class='export2excel-container'>
    <!--  弹窗-->
    <el-dialog
      v-model="visableDialog"
      title='更换主题'
      width='30%'
    >
      <template #footer>
      <span class='dialog-footer'>
        <el-button @click='onCancel'>取消</el-button>
        <el-button type='primary' @click='onConfirm'>确认</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang='scss' scoped></style>
