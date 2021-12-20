<template>
  <div class='create-article-page'>
    <el-card>
      <el-form :model='{title}'>
        <el-form-item prop='title' :rules='{required:true, trigger:"blur", message: "必须输入标题"}'>
          <el-input placeholder='请输入文章标题' min='1' maxlength='10' v-model='title' />
        </el-form-item>
      </el-form>
      <el-tabs class='tab-container' v-model='activeName'>
        <el-tab-pane label='markdown' name='0'>
          <markdown :detail='detail' />
        </el-tab-pane>
        <el-tab-pane label='富文本' name='1'>
          <editor :detail='detail' />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { computed, nextTick, provide, ref, watch } from 'vue'
import Editor from '@/views/article-create/components/Editor'
import Markdown from '@/views/article-create/components/Markdown'
import router from '@/router'
import { getArticleDetailApi } from '@/api/article'
// tab激活name
const activeName = ref('0')
// 文章标题
const title = ref('')
// 文章内容
const detail = ref(null)
// provide: 标题
provide('title', title)
// provide: 重置富文本
provide('resetEditor', resetEditor)
// 当前文章id , 没有就是空
const id = computed(() => router.currentRoute.value.params.id)
// 判断: 编辑/新建文章
judgeEditType()

// 重置
watch(id, (newId) => {
  if (!newId) {
    resetEditor()
  }
})

/**
 * 判断: 编辑/新建文章
 * @returns {Promise<void>}
 */
async function judgeEditType () {
  if (id.value) {
    detail.value = await getArticleDetailApi(id.value)
    title.value = detail.value.title
  }
}

function resetEditor () {
  title.value = null
  detail.value = null
  nextTick(() => {
    router.push('/article/create')
  })
}
</script>

<style lang='scss' scoped>
.create-article-page {
  .tab-container {
    margin-top: 20px;
  }

  ::v-deep .article-submit-button {
    margin-top: 20px;
    margin-bottom: 20px;
    float: right;
  }
}
</style>
