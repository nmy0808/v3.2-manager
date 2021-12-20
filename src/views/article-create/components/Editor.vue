<template>
  <div>
    <div id='normal_editor'>
    </div>
    <el-button
      @click='onSubmit'
      class='article-submit-button' type='primary'>提交
    </el-button>
  </div>
</template>

<script setup>
import E from 'wangeditor'
import { defineProps, inject, onMounted, watch } from 'vue'
import submit from '@/views/article-create/components/submit'

const props = defineProps({
  detail: Object
})

const title = inject('title')
const resetEditor = inject('resetEditor')

let editor
onMounted(() => {
  initEditor()
})

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

function initEditor () {
  editor = new E('#normal_editor')
  editor.getHTML = () => editor.txt.html()
  editor.setHTML = (html) => editor.txt.html(html)
  editor.reset = () => editor.txt.clear()
  editor.create()
}

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
