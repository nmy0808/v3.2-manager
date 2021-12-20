<template>
  <div class='markdown-container'>
    <div id='markdown_editor'>
    </div>
    <el-button
      @click='onSubmit'
      class='article-submit-button' type='primary'>提交
    </el-button>
  </div>
</template>

<script setup>
import { inject, defineProps, onMounted, watch } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import submit from '@/views/article-create/components/submit'

const props = defineProps({
  detail: Object
})

const title = inject('title')
const resetEditor = inject('resetEditor')
// 富文本对象
let editor
// 初始化editor对象
const initEditor = () => {
  editor = new Editor({
    el: document.querySelector('#markdown_editor'),
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical'
  })
}
// 声明周期
onMounted(() => {
  // 1.初始化editor对象
  initEditor()
  // 2.监听详情, 如果有_id则为编辑文章, 反之为新建文章
  // 如果是编辑文章, 将content内容赋予富文本
  // 反之是新建文章, 则清空富文本内容, 以免出现之前记录的显示bug
  watch(() => props.detail, (detail) => {
    if (detail && detail._id) {
      editor.setHTML(props.detail.content)
    } else {
      editor.reset()
    }
  })
})
// 提交
const onSubmit = () => {
  submit(editor, title, props.detail)
    .then(() => {
      editor.reset()
      resetEditor()
    })
}

</script>

<style lang='scss' scoped></style>
