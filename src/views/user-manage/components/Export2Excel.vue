<template>
  <div class='export2excel-container'>
    <!--  弹窗-->
    <el-dialog
      :model-value='modelValue'
      title='更换主题'
      width='30%'
    >
      <el-form :model='filenameForm' ref='formCom'>
        <el-form-item prop='filename' :rules='[{required:true, trigger:"blur",message:"必须填写表格名称"}]'>
          <el-input
            v-model='filenameForm.filename'
            type='text' placeholder='请输入导出后生成的文件名' />
        </el-form-item>
      </el-form>
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
import { defineProps, defineEmits, ref } from 'vue'
import constants from '@/constants'
import { getUserManageAllListApi } from '@/api/user-manage'
import { excelFieldMap } from '@/components/UploadExcel/utils/excelFieldMap'
// eslint-disable-next-line camelcase
import { export_json_to_excel } from '@/utils/export_json_to_excel'
import dayjs from 'dayjs'

// props: 接收dialog显示的属性
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

// emits: 切换dialog的显示状态
const emits = defineEmits(['update:modelValue'])

// 导出文件名
// const filename = ref(constants.DEFAULT_FILE_NAME)
const filenameForm = ref({
  filename: constants.DEFAULT_FILE_NAME
})

// 关闭窗口
const close = () => {
  emits('update:modelValue', !props.modelValue)
}
// 事件: 点击取消按钮
const onCancel = () => {
  close()
}
// 组件: 表单组件
const formCom = ref(null)

// 事件: 点击确认下载excel按钮
const onConfirm = () => {
  // 表单不能为空
  formCom.value.validate(async valid => {
    if (!valid) return
    // 1.确认后获取所有用户列表
    const userManageAllList = await getUserManageAllList()
    // 2.将json转换为二维数组
    // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
    const data = formatData(userManageAllList)
    // 3.转换成excel格式文件并下载该文件
    // 配置参数
    const options = {}
    // - excel 表头 [title,title ...]
    options.header = Object.keys(excelFieldMap)
    // - excel 数据（二维数组结构）
    options.data = data
    // - 文件名称
    options.filename = filenameForm.value.filename
    // - 是否自动列宽
    options.autoWidth = true
    // - 文件类型
    options.bookType = 'xlsx'
    // 传入配置参数执行工具函数
    export_json_to_excel(options)
    close()
  })
}

/**
 * 将json转换为二维数组
 * @description [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
 * @param list {Array}  接口返回数据
 * @returns {*}
 */
function formatData (list) {
  // 导入字典
  const map = excelFieldMap
  // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
  return list.map(item => {
    // 获取英文的key
    const enKeys = Object.values(map)
    // 遍历英文key, 获得对应的值
    // 返回数组格式: [13100330033, '小红', 18...]
    return enKeys.map(key => {
      const value = item[key]
      if (key === 'role') {
        // 将角色数组转换成: json格式的数组
        return JSON.stringify(value.map(role => role.title))
      }
      if (key === 'openTime') {
        // 将时间戳转换为正常格式日期
        return dayjs(+value).format('YYYY/MM/DD')
      }
      return value
    })
  })
}

// api: 获取所有用户列表
async function getUserManageAllList () {
  return (await getUserManageAllListApi()).list
}
</script>

<style lang='scss' scoped></style>
