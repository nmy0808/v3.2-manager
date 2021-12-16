<template>
  <div class="profile-page">
    <el-row>
      <el-col :span="6">
        <el-card>
          <!-- 介绍 -->
          <ProjectCard></ProjectCard>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane label="功能" name="0">
              <Feature></Feature>
            </el-tab-pane>
            <el-tab-pane label="章节" name="1">
              <Chapter/>
            </el-tab-pane>
            <el-tab-pane label="作者" name="2">
              <Author/>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import ProjectCard from '@/views/profile/components/ProjectCard.vue'
import { provide, ref } from 'vue'
import { getFeatureApi, getChapterApi } from '@/api/user'
import Feature from './components/Feature.vue'
import Chapter from './components/Chapter.vue'
import Author from './components/Author.vue'

const featureList = ref([])
const chapterList = ref([])
provide('featureList', featureList)
provide('chapterList', chapterList)

getFeatureData()
getChapterData()

const activeName = ref('0')

async function getFeatureData() {
  featureList.value = await getFeatureApi()
}
async function getChapterData() {
  chapterList.value = await getChapterApi()
}
</script>

<style lang="scss" scoped></style>
