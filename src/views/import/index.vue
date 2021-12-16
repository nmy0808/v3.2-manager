<template>
  <div class='user-import-page'>
    <upload-excel :onSuccess='onSuccess' :beforeUpload='onBeforeUpload' />
  </div>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel/UploadExcel'
import { excelFieldMap } from '@/components/UploadExcel/utils/excelFieldMap'
import { formatDate, isExcel } from '@/components/UploadExcel/utils'
import { getUserMangeImportApi } from '@/api/user'
import { ElMessage } from 'element-plus'
import router from '@/router'
// excel上传前回调
const onBeforeUpload = (rawFile) => {
  // 判断: excel类型
  const flag = isExcel(rawFile)
  if (!flag) {
    ElMessage.warning('上传文件类型错误, 请检查是否为表格类型文件')
    return
  }
  return true
}
// excel解析成功回调
const onSuccess = async (excelData) => {
  const {
    header,
    results
  } = excelData
  // 转换excel中文=>英文字段 {姓名: ''} => {username: ''}
  const params = getEnFieldExcel(results)
  await getUserMangeImportApi(params)
  ElMessage.success(results.length + '条数据上传成功')
  await router.push({ path: '/user/manage' })
}
/**
 * 将中文字段的数组转换为字典对应的英文字段数组
 * @param zhExcel
 * @returns {*[]}
 */
const getEnFieldExcel = (zhExcel) => {
  const result = []
  zhExcel.forEach(item => {
    const tempObj = {}
    Object.keys(item).forEach(key => {
      const currKey = excelFieldMap[key]
      let value = item[key]
      // 处理时间bug
      if (currKey === 'openTime') {
        value = formatDate(value)
      }
      tempObj[currKey] = value
    })
    result.push(tempObj)
  })
  return result
}
</script>

<style lang='scss' scoped></style>
