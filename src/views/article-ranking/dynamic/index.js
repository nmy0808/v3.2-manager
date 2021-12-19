import getDynamicData from './dynamicData'
import { computed, ref, watch } from 'vue'

// 暴露出动态列数据
export const dynamicData = ref(getDynamicData())
// 所有column
export const columnLabels = dynamicData.value.map(it => it.label)
// 被勾选的动态列数据
export const selectColumns = ref([])
const initColumns = () => {
  selectColumns.value = dynamicData.value.map(it => it.label)
}
initColumns()
// table 的列数据
export const tableColumns = ref(null)
// 方法: 根据动态列数据获取对应table列数据
const initTableData = () => {
  tableColumns.value = dynamicData.value.filter(it => {
    return selectColumns.value.includes(it.label)
  })
}
watch(selectColumns, () => {
  initTableData()
}, {
  immediate: true,
  deep: true
})
