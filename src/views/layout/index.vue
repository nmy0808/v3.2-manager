<template>
  <div class='app-wrapper' :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']">
    <!-- 左侧 menu -->
    <sidebar
      id='guide-sidebar'
      class='sidebar-container'
      :style='{ backgroundColor: variables.menuBg }'
    />
    <div class='main-container'>
      <div class='fixed-header'>
        <!-- 顶部的 navbar -->
        <navbar />
      </div>
      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>

<script setup>
import Navbar from './Navbar'
import Sidebar from './sidebar'
import AppMain from './AppMain'
// 主题更换: 为 `sidebar` 赋值动态的背景颜色
import variables from '@/assets/styles/variable.scss'
</script>

<style lang='scss' scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
