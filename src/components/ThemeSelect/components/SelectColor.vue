<template>
  <!--  弹窗-->
  <el-dialog
    v-bind='$attrs'
    title='更换主题'
    width='30%'
    @closed='onClosed'
  >
    <el-color-picker :predefine='predefineColors' v-model='currColor' />
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
import { ref, defineEmits, computed } from 'vue'
import store from '@/store'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
// emit: 触发关闭窗口
const emit = defineEmits(['update:modelValue'])
// 预设颜色
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])
// 当前颜色
const themeColor = computed(() => store.getters.themeColor)
const currColor = ref(themeColor.value)
// 事件: 关闭窗口
const onCancel = () => {
  emit('update:modelValue', false)
  currColor.value = themeColor.value
}
// 事件: 确认窗口
const onConfirm = () => {
  if (currColor.value === themeColor.value) {
    return emit('update:modelValue', false)
  }
  store.commit('theme/setThemeColor', currColor.value)
  emit('update:modelValue', false)
  // 更改element的主题颜色
  generateNewStyle(currColor.value).then(style => {
    writeNewStyle(style)
  })
}
// 事件: 关闭后触发
const onClosed = () => {
}

</script>

<style lang='scss' scoped></style>
