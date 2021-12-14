<template>
  <div class='navbar'>
    <div class='right-menu'>
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
</template>

<script setup>
import store from '@/store'
// 事件: 退出登录
const onLayout = () => {
  store.dispatch('user/loginOut')
}
</script>

<style lang='scss' scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

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
  }
}
</style>
