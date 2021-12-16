<template>
  <div class="chapter-page">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in chapterList"
        :key="index"
        :timestamp="activity.timestamp"
        placement="top"
      >
        <el-card>
          {{ activity.content }}
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const chapterList = inject('chapterList')
</script>

<style lang="scss" scoped></style>
