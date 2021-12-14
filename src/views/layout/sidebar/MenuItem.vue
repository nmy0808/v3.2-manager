<template>
  <div class='icon-box'>
    <i v-if="icon.includes('el-icon')" class='sub-el-icon' :class='icon'></i>
    <svg-icon v-else :icon='icon'></svg-icon>
  </div>
  <!--  lang 国际化-->
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import { defineProps } from 'vue'
import { generateTitle } from '@/utils/lang'

defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})

</script>

<style lang='scss' scoped>
.icon-box{
  width: 24px;
}
.sub-el-icon{
  //display: inline-block;
}
</style>
