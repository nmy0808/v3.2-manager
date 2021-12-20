<template>
  <div class='app-main'>
    <router-view v-slot="{ Component }">
      <transition name='switch-page' mode='out-in'>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang='scss' scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 110px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
