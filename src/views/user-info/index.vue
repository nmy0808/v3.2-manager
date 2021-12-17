<template>
  <div class='user-info'>
    <!--    actions-->
    <el-card class='user-info-action'>
      <el-button class='print-icon' type='primary' :loading='printLoading' v-print='printObj'>打印</el-button>
    </el-card>
    <!--    user-info-->
    <el-card class='user-info-desc' v-if='descData'>
      <el-row class='user-info-desc-row' id='userInfoBox'>
        <el-col :span='16'>
          <el-descriptions :column='2' border>
            <el-descriptions-item label='姓名'>{{ descData.username }}</el-descriptions-item>
            <el-descriptions-item label='性别'>{{ descData.gender || '未知' }}</el-descriptions-item>
            <el-descriptions-item label='民族'>{{ descData.nationality }}</el-descriptions-item>
            <el-descriptions-item label='手机号'>{{ descData.mobile }}</el-descriptions-item>
            <el-descriptions-item label='居住地'>{{ descData.province }}</el-descriptions-item>
            <el-descriptions-item label='入职时间'>{{ descData.openTime }}</el-descriptions-item>
            <el-descriptions-item label='备注' :span='2'>
              <el-tag class='remark-tag' v-for='tag in descData.remark' :key='tag'>
                {{ tag }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label='联系地址' :span='2'>{{ descData.address }}</el-descriptions-item>
          </el-descriptions>
        </el-col>
        <el-col :span='4' class='user-info-desc-avatar'>
          <el-image :src='descData.avatar' :preview-src-list='[descData.avatar]' />
        </el-col>
        <el-col :span='20'>
          <el-descriptions :column='1' direction='vertical' border class='descriptions-item-wrap'>
            <el-descriptions-item label='经历'>
              <el-row v-for='item in descData.experience' :key='item.title'>
                <div class='experience-item'>
                  {{ $filters.formatDate(item.startTime) }}
                </div>
                <div class='experience-item'>
                  {{ item.title }}
                </div>
                <div class='experience-item'>
                  {{ item.desc }}
                </div>
              </el-row>
            </el-descriptions-item>
            <el-descriptions-item label='专业'>{{ descData.major }}</el-descriptions-item>
            <el-descriptions-item label='荣耀'>{{ descData.glory }}</el-descriptions-item>
          </el-descriptions>
        </el-col>
        <el-col :offset='15' :span='5' class='user-info-desc-footer'>
          签字：___________日期:___________
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { getUserManageInfoByIdApi } from '@/api/user-manage'
// router: 支持props:true
// id:     员工id
const props = defineProps({
  id: String
})
// 员工信息数据源
const descData = ref(null)

// 初始化: 获取员工信息
getUserDescById()

// api: 根据id获取员工详细信息
async function getUserDescById () {
  descData.value = await getUserManageInfoByIdApi(props.id)
}

// 打印相关
const printLoading = ref(false)

const printObj = {
  // 打印区域
  id: 'userInfoBox',
  // 打印标题
  popTitle: 'imooc-vue-element-admin',
  // 打印前
  beforeOpenCallback (vue) {
    printLoading.value = true
  },
  // 执行打印
  openCallback (vue) {
    printLoading.value = false
  }
}
</script>

<style lang='scss' scoped>
.user-info {
  .user-info-action {
    text-align: right;
    margin-bottom: 20px;
  }

  .user-info-desc {
    .user-info-desc-row {
      margin-left: 150px;
    }

    .remark-tag {
      margin-right: 4px;
    }

    .user-info-desc-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #ebeef5;
    }

    .experience-item {
      display: inline-block;
      padding: 5px 10px;
    }

    .user-info-desc-footer {
      text-align: right;
      padding: 50px 0 10px 0;
    }
  }

  .descriptions-item-wrap ::v-deep .el-descriptions__cell {
    border-top: none;
  }
}
</style>
