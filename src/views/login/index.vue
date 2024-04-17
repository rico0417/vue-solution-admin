<template>
  <div class="login-container">
    <div class="login-tool">
      <el-form class="login-form" label-position="top">
        <el-form-item label="Account">
          <el-input class="login-item" v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input
            class="login-item"
            type="password"
            show-password
            v-model="loginForm.password"
            placeholder="密码"
            autocomplete="new-password"
          ></el-input>
        </el-form-item>
        <el-button type="primary" class="login-item">登录</el-button>
      </el-form>
    </div>
    <div class="login-tip"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { useUserStore } from '@/stores/modules/user';
defineOptions({
  name: 'Login'
});

// const userStore = useUserStore();
const loginForm = ref({
  username: '',
  password: ''
});
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  height: 100%;
  box-sizing: border-box;
}
.login-tool {
  width: 36%;
  height: 100%;
  background-color: #f8f8f8;
  border-right: 1px solid #dfdfdf;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-form {
    width: 400px;
  }
}
.login-tip {
  width: 64%;
  height: 100%;
  background-color: #fdfdfd;
}
.login-item {
  width: 100%;
  height: 42px;
}
</style>
