<template>
  <!--  弹窗-->
  <el-dialog
    :model-value='modelValue'
    title='分配权限'
    width='30%'
    @closed='onClosed'
  >
    <el-tree
      ref='treeCom'
      :data='permissionList'
      show-checkbox
      default-expand-all
      node-key='id'
      highlight-current
      :props='defaultProps'
    />
    <template #footer>
      <span class='dialog-footer'>
        <el-button @click='onCancel'>取消</el-button>
        <el-button type='primary' @click='onConfirm'>确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// 角色列表-分配权限
import { defineProps, defineEmits, watch, ref } from 'vue'
import { getDistributePermissionByIdApi, getPermissionListApi, getRoleByIdApi } from '@/api/permission'
import { ElMessage } from 'element-plus'

// props: 角色id, dialog显示
const props = defineProps({
  id: String,
  modelValue: Boolean
})

// emits: 切换显示
const emit = defineEmits(['update:modelValue'])

// data: 当前角色的权限
const currentPermission = ref(null)
// data: 权限列表
const permissionList = ref(null)
// data: table的props配置对象
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}
// 组件: tree组件
const treeCom = ref(null)
// 监听: 当前id和窗口开启时赋予tree的选中状态
watch([() => props.id, () => props.modelValue], async ([id, isShow]) => {
  // 判断: id改变并且窗口开启状态
  if (id && isShow) {
    console.log(1)
    // 请求: 请求权限列表和当前角色权限
    Promise.all([getPermissionList(), getPermissionById()])
      .then(_ => {
        // 设置tree当前权限选中状态
        treeCom.value.setCheckedNodes(currentPermission.value.map(id => {
          return { id }
        }))
      })
  }
})

// 方法: 关闭窗口
const onClosed = () => {
  emit('update:modelValue', false)
  // 关闭窗口时重置tree选中状态
  treeCom.value.setCheckedKeys([])
}

// 事件: 取消
const onCancel = () => {
  onClosed()
}
// 事件: 确定
const onConfirm = async () => {
  const params = {}
  params.roleId = props.id
  params.permissions = treeCom.value.getCheckedKeys()
  // api: 为该角色分配权限
  await getDistributePermissionByIdApi(params)
  ElMessage.success('分配权限成功')
  onClosed()
}

/**
 * 根据角色id获取当前角色对应的权限
 * @returns {Promise<void>}
 */
async function getPermissionById () {
  currentPermission.value = await getRoleByIdApi(props.id)
}

/**
 * 获取权限列表
 * @returns {Promise<void>}
 */
async function getPermissionList () {
  permissionList.value = await getPermissionListApi()
}
</script>

<style lang='scss' scoped></style>
