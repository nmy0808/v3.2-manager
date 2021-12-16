<template>
  <el-dropdown class="theme-dropdown" @command="handleCommand">
    <span class="el-dropdown-link">
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <svg-icon class="theme-icon" icon="change-theme" />
      </el-tooltip>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>换肤</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!--  选择颜色-->
  <SelectColor v-model="dialogVisible" />
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from '@/components/ThemeSelect/components/SelectColor'

const dialogVisible = ref(false)
const handleCommand = () => {
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.theme-dropdown {
  margin-right: 20px;

  .theme-icon {
    font-size: 25px;
  }
}
</style>
