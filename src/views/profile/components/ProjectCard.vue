<template>
  <div class="project-page">
    <div class="project-user">
      <div class="project-user-title">介绍</div>
      <div class="project-user-body">
        <el-avatar
          size="large"
          class="project-user-body-avatar"
          src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        ></el-avatar>
        <div class="project-user-body-name">
          {{ $store.getters.userInfo.username }}
        </div>
        <div class="project-user-body-role">
          {{ $store.getters.userInfo.title }}
        </div>
      </div>
    </div>
    <div class="project-info">
      <div class="project-info-title">
        <svg-icon icon="introduce" />
        项目介绍
      </div>
      <div class="project-info-body">
        《vue3 改写 vue-element-admin，实现后台前端综合解决方案》项目演示
      </div>
    </div>
    <div class="project-feature">
      <div class="project-feature-title">
        <svg-icon icon="reward" />
        项目功能
      </div>
      <div class="project-feature-body">
        <div
          class="project-feature-body-item"
          v-for="item in featureList"
          :key="item.title"
        >
          <div class="project-feature-body-item-title">{{ item.title }}</div>
          <el-progress status="success" :percentage="100"></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const featureList = inject('featureList')
</script>

<style lang="scss" scoped>
@mixin title {
  font-size: 15px;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 1px solid rgb(235, 235, 235);
}
.project-page {
  .project-user {
    &-title {
      @include title;
    }
    &-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      padding: 20px 0;
      &-name {
        padding: 0.3em 0;
        font-weight: bold;
      }
    }
  }
  .project-info {
    &-title {
      @include title;
    }
    &-body {
      font-size: 14px;
      padding: 30px 0;
    }
  }
  .project-feature {
    &-title {
      @include title;
    }
    &-body {
      &-item {
        padding: 4px 0;
        &-title {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
