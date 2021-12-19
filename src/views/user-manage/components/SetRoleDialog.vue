<template>
  <!--  弹窗-->
  <el-dialog
    :model-value='modelValue'
    title='分配'
    width='30%'
    @closed='onClosed'
  >
    <el-checkbox-group v-model='roleData'>
      <el-checkbox v-for='item in roleList' :key='item.id' :label='item.title' />
    </el-checkbox-group>
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
import { defineProps, defineEmits, watch, ref, toRaw, inject } from 'vue'
import { getPermissionByIdApi, getRoleListApi, getSetUserRoleByIdApi } from '@/api/role'
import { ElMessage } from 'element-plus'
// props: modelValue:是否显示
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  currentUser: {
    type: Object
  }
})
// emits: 切换显示
const emit = defineEmits(['update:modelValue'])
// inject: 刷新用户列表
const getUserMangeList = inject('getUserMangeList')

// data: 当前用户角色 ['title', 'title', ...]
const roleData = ref(null)
// data: 所有角色列表
const roleList = ref(null)

// watch: 监听传来的当前选择用户对象变化和当前是否开启窗口, 获取对应角色信息和角色列表
watch([() => props.currentUser, () => props.modelValue], async ([user, isShow]) => {
  if (user && isShow) {
    roleData.value = (await getPermissionByIdApi(user._id)).role.map(it => it.title)
    roleList.value = await getRoleListApi()
  }
})
const onClosed = () => {
  emit('update:modelValue', false)
  roleData.value = []
}
const onCancel = () => {
  onClosed()
}
const onConfirm = async () => {
  const params = {}
  params.roles = roleData.value.map(title => {
    return roleList.value.find(it => it.title === title)
  })
  params.userId = props.currentUser._id
  // api: 分配角色
  await getSetUserRoleByIdApi(params)
  // api: 刷新用户列表
  getUserMangeList()
  ElMessage.success('分配角色成功')
  onClosed()
}
</script>

<style lang='scss' scoped></style>
