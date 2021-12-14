<template>
  <div class='login-page'>
    <el-form class='login-form' :model='loginForm' :rules='loginRules' ref='formCom'>
      <div class='login-form-title'>用户登录</div>
      <LangSelect class='login-lang' effect='light'/>
      <el-form-item prop='username'>
        <el-input placeholder='请输入账号' v-model='loginForm.username'>
          <template #prefix>
            <svg-icon icon='user' />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop='password'>
        <el-input :type='pwdType' placeholder='请输入密码' v-model='loginForm.password' ref='inputEl'>
          <template #prefix>
            <svg-icon icon='password' />
          </template>
          <template #suffix>
            <svg-icon :icon='pwdType==="password"?"eye":"eye-open"' @click='onChangePwdType' />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class='login-form-btn' type='primary' @click='onLoginSubmit'>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { validatePassword } from '@/utils/validate-rules'
import { useStore } from 'vuex'
import router from '@/router'
import LangSelect from '@/components/LangSelect'
// 对象: 用户登录form
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
// 对象: 登录规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名不能为空'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      message: '密码不能为空'
    },
    {
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})
// 数据: 当前密码框是否显示密码
const pwdType = ref('password')
// dom: 密码input
const inputEl = ref(null)
// com: 登录form组件
const formCom = ref(null)
const store = useStore()
// 事件: 点击小眼睛图标切换是否显示密码
const onChangePwdType = () => {
  if (pwdType.value === 'password') {
    pwdType.value = 'text'
  } else {
    pwdType.value = 'password'
  }
  // 重新获取焦点
  nextTick(() => {
    inputEl.value.focus()
  })
}
// 事件: 提交登录
const onLoginSubmit = () => {
  formCom.value.validate((valid) => {
    if (valid) {
      store.dispatch('user/login', loginForm.value).then(() => {
        router.push('/')
      })
    }
  })
}
</script>

<style lang='scss' scoped>
.login-page {
  width: 100%;
  min-height: 100%;
  background: $bg;
  ::v-deep .el-input__validateIcon{
    display: none;
  }
  .login-lang{
    position: absolute;
    right: 0;
    top: 230px;
  }
  .login-form {
    position: relative;
    width: 500px;
    height: 200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 200px 0 30px;

    &-title {
      font-size: 30px;
      color: white;
      line-height: 3;
    }

    ::v-deep(.el-form-item) {
      width: 100%;

      input {
        color: $light_gray;
        background: rgba(black, 0.2);
        caret-color: $cursor;
        border-color: rgba(white, 0.2);
      }

      .el-input__prefix {
        margin-left: 0.3em;
      }

      .el-input__suffix {
        margin-right: 0.3em;
      }
    }

    &-btn {
      width: 100%;
    }
  }
}
</style>
