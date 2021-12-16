<template>
  <div class='upload-excel-container'>
    <div class='upload-excel-btn'>
      <el-button type='primary' @click='onOpenUpload' :loading='loading'>点击上传</el-button>
    </div>
    <div class='upload-excel-drag'
         @drop.stop.prevent='onDrag'
         @dragenter.stop.prevent='onDragover'
         @dragover.stop.prevent='onDragover'>
      <svg-icon icon='upload' />
      <div>将文件拖到此处</div>
    </div>
    <input type='file' style='display: none;' accept='.xlsx, .xls' ref='inputEl' @change='onFileChange'>
  </div>
</template>

<script setup>
import XLSX from 'xlsx'
import { computed, ref, defineProps } from 'vue'
import store from '@/store'
import { getHeaderRow } from '@/components/UploadExcel/utils'
import { ElMessage } from 'element-plus'

const props = defineProps({
  // 上传前回调
  beforeUpload: Function,
  // 成功回调
  onSuccess: Function
})
// flag: 加载
const loading = ref(false)
// Dom: input type='file'
const inputEl = ref(null)
// 全局主题色
const menuBg = computed(() => store.getters.cssVar.menuBg)
// 事件: 打开file上传窗口
const onOpenUpload = () => {
  inputEl.value.click()
}
// 事件: 拖拽文件松手上传
const onDrag = (e) => {
  const rawFile = e.dataTransfer.files[0]
  upload(rawFile)
}
// 事件: 拖拽文件enter和over的时候
const onDragover = (e) => {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
  // 在新位置生成源项的副本
  e.dataTransfer.dropEffect = 'copy'
}
// 事件: input点击确定上传时触发
const onFileChange = (e) => {
  const rawFile = e.target.files[0]
  upload(rawFile)
}
/**
 * 触发上传事件
 */
const upload = rawFile => {
  loading.value = true
  if (!rawFile) {
    ElMessage.warning('并没有选择文件, 无法上传')
    return
  }
  // 清空input
  inputEl.value.value = null
  // 如果没有指定上传前回调的话
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 如果指定了上传前回调，那么只有返回 true 才会执行后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}
/**
 * 读取数据（异步）
 */
const readerData = rawFile => {
  loading.value = true
  return new Promise((resolve, reject) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    const reader = new FileReader()
    // 该事件在读取操作完成时触发
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
    reader.onload = e => {
      // 1. 获取解析到的数据
      const data = e.target.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 只读取 Sheet1（第一张表格）的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(worksheet)
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet)
      // 7. 传入解析之后的数据
      generateData({
        header,
        results
      })
      // 8. loading 处理
      loading.value = false
      // 9. 异步完成
      resolve()
    }
    // 启动读取指定的 Blob 或 File 内容
    reader.readAsArrayBuffer(rawFile)
  })
}
/**
 * 根据导入内容，生成数据
 */
const generateData = (excelData) => {
  // 将数据交给props的成功回调
  if (props.onSuccess) {
    props.onSuccess(excelData)
  }
}
</script>

<style lang='scss' scoped>
@mixin item {
  width: 300px;
  height: 200px;
  border: 1px solid $light_gray;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-excel-container {
  display: flex;
  justify-content: center;

  .upload-excel-btn {
    @include item;
  }

  .upload-excel-drag {
    @include item;
    flex-direction: column;
    color: #747784;

    .svg-icon {
      color: v-bind(menuBg);
      font-size: 50px;
    }
  }
}
</style>
