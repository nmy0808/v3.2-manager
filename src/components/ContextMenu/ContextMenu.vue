<template>
  <ul class='context-menu-container' :style='positionStyle' v-if='modelValue'>
    <li @click='onRefreshClick'>
      {{ $t('msg.tagsView.refresh') }}
    </li>
    <li @click='onCloseRightClick'>
      {{ $t('msg.tagsView.closeRight') }}
    </li>
    <li @click='onCloseOtherClick'>
      {{ $t('msg.tagsView.closeOther') }}
    </li>
  </ul>
</template>

<script setup>
import { computed, defineProps, defineEmits, watch, onUnmounted } from 'vue'
import store from '@/store'

const props = defineProps({
  // 当前的css定位位置
  position: {
    type: Object
  },
  // 当前右键选中的标签
  currentTag: {
    type: Object
  },
  // 当前是否显示
  modelValue: {
    type: Boolean,
    default: false
  }
})

// 计算: 当前fixed定位位置
const positionStyle = computed(() => {
  return {
    position: 'fixed',
    top: props.position.y + 'px',
    left: props.position.x + 'px'
  }
})
// emit: 修改当前显示状态
const emit = defineEmits(['update:modelValue'])
// 方法: 关闭当前显示状态
const close = () => {
  emit('update:modelValue', false)
}
// 监听: 显示状态时: 注册全局事件, 隐藏状态时: 取消全局事件
// 全局事件: 关闭当前tag窗口
watch(() => props.modelValue, (flag) => {
  if (flag) {
    window.addEventListener('click', close)
  } else {
    window.removeEventListener('click', close)
  }
})
// 以防万一 取消全局事件监听
onUnmounted(() => {
  console.log('销毁关闭事件', 'contextMenu.vue')
  window.removeEventListener('click', close)
})
// 事件: 刷新页面
const onRefreshClick = () => {
  location.reload()
}
// 事件: 关闭右侧tag
const onCloseRightClick = () => {
  store.dispatch('app/deleteTagViewByType', {
    type: 'right',
    item: props.currentTag
  })
}
// 事件: 关闭其他tag
const onCloseOtherClick = () => {
  store.dispatch('app/deleteTagViewByType', {
    type: 'other',
    item: props.currentTag
  })
}
</script>

<style lang='scss' scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;

    &:hover {
      background: #eee;
    }
  }
}
</style>
