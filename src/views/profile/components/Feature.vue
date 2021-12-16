<template>
  <div class="feature-page">
    <el-collapse v-model="activeName">
      <el-collapse-item
        :title="item.title"
        class="feature-page-item"
        v-for="item in featureList"
        :key="item.title"
      >
        <div v-html="item.content"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import store from '../../../store'

const featureList = inject('featureList')

const activeName = ref(null)

const color = computed(() => store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.feature-page {
  ::v-deep .el-collapse-item__header.is-active {
    color: v-bind(color);
    font-weight: bold;
  }
  .feature-page-item {
    padding: 20px 0;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
