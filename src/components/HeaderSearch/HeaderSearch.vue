<template>
  <div class='header-search'>
    <svg-icon
      class-name='search-icon'
      icon='search'
      @click.stop='onShowClick'
    />
    <el-select
      ref='selectCom'
      v-model='search'
      placeholder='search'
      :class='{hide: !isShow}'
      filterable
      default-first-option
      remote
      :remote-method='onRemoteMethod'
      @change='onSelectChange'>
      <el-option
        v-for='item in optionList'
        :key='item.item.path'
        :label='item.item.title.join(" > ")'
        :value='item.item.path'
      >
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { generateFuseData } from '@/components/Screenfull/fuseData'
import Fuse from 'fuse.js'
import router from '@/router'
import { watchEffectI18n } from '@/i18n/watchEffectI18n'
// 组件: <el-select>
const selectCom = ref(null)
// 是否显示
const isShow = ref(false)
// 当前选项
const search = ref('')
// 最终搜索的选项列表, 有fuse模糊查询获得
const optionList = ref([])
// 切换显示
const onShowClick = () => {
  isShow.value = !isShow.value
}
// 隐藏
const onClose = () => {
  isShow.value = false
  search.value = ''
  optionList.value = []
}
// fuse对象
let fuse
// 初始化fuse模糊搜索列表, 赋值 fuse 变量
getFuse()
// 监听切换国际化, 重新获取fuse
watchEffectI18n(() => {
  getFuse()
})
// 监听是否显示, 如果当前显示状态,点击范围外会隐藏
watch(isShow, (flag) => {
  if (flag) {
    // 聚焦
    selectCom.value.focus()
    document.documentElement.addEventListener('click', onClose)
  } else {
    document.documentElement.removeEventListener('click', onClose)
    onClose()
  }
})
// 事件: 输入时触发模糊搜索
const onRemoteMethod = (query) => {
  if (query.trim() === '') {
    optionList.value = []
  } else {
    optionList.value = fuse.search(query)
  }
}
// 事件: 选择某一项option
const onSelectChange = (query) => {
  router.push(query)
}
/**
 * 获取模糊搜索总列表
 */
function getFuse () {
  const fuseList = generateFuseData()
  fuse = new Fuse(fuseList, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}

</script>

<style lang='scss' scoped>
.header-search {
  display: flex;
  align-items: center;
  margin-right: 10px;

  .search-icon {
    font-size: 23px;
  }

  ::v-deep .el-select {
    transition: width $sideBarDuration;
    width: 200px;

    &.hide {
      width: 0;
      overflow: hidden;
    }
  }

}

.search-icon {
  margin-right: 10px;
}
</style>
