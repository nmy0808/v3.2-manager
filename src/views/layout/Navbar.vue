<template>
  <div class='navbar'>
    <div class='navbar-top'>
      <div class='left-menu'>
        <!--     汉堡按钮-->
        <hamburger class='hamburger-container' />
        <!--      面包屑-->
        <Breadcrumb />
      </div>
      <div class='right-menu'>
        <!--     引导-->
        <Guide class='right-menu-item hover-effect' id='guide-start' />
        <!--     搜索 -->
        <header-search />
        <!--      全屏-->
        <screen-full />
        <!--      主题-->
        <theme-select></theme-select>
        <!--   国际化-->
        <LangSelect />
        <!--      头像  -->
        <div class='avatar-wrapper'>
          <el-dropdown trigger='click'>
            <span class='el-dropdown-link'>
              <el-avatar shape='square' :src='$store.state.user.userInfo.avatar' />
              <i class='el-icon-s-tools'></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>首页</el-dropdown-item>
                <el-dropdown-item divided @click='onLayout'>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import store from '@/store'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import LangSelect from '@/components/LangSelect'
import ThemeSelect from '@/components/ThemeSelect/ThemeSelect'
import ScreenFull from '@/components/Screenfull/ScreenFull'
import HeaderSearch from '@/components/HeaderSearch/HeaderSearch'
import Guide from '@/components/Guide/Guide'
// 事件: 退出登录
const onLayout = () => {
  store.dispatch('user/loginOut')
}
</script>

<style lang='scss' scoped>
.navbar {
  overflow: hidden;
  position: relative;
  background: #fff;
  .navbar-top{
    overflow: hidden;
  }
  .el-avatar {
    --el-avatar-bg-color: none;
  }

  .left-menu {
    float: left;
    display: flex;
    align-items: center;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    cursor: pointer;

    ::v-deep .el-avatar {
      margin-top: 5px;
      position: relative;
      --el-avatar-background-color: none;
      margin-right: 12px;
    }

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      // hover 动画
      transition: background #{$sideBarDuration};

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }

}
</style>
