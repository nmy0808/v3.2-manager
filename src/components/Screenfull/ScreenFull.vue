<template>
  <svg-icon
    :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    @click='onToggle'
  />
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import screenfull from 'screenfull'
// 是否全屏
const isFullscreen = ref(false)
// 事件切换全屏
const onToggle = () => {
  screenfull.toggle()
}
// 监听变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// 设置侦听器
onMounted(() => {
  screenfull.on('change', change)
})

// 删除侦听器
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style lang='scss' scoped></style>
