<template>
  <div class="login-container">
    <div class="login-tool">
      <el-form
        ref="loginFormRef"
        class="login-form"
        label-position="top"
        :model="loginForm"
        :rules="loginRules"
        size="large"
      >
        <el-form-item label="Account" prop="usernasme">
          <el-input class="login-item" v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="passwsord">
          <el-input
            class="login-item"
            type="password"
            show-password
            v-model="loginForm.password"
            placeholder="密码"
            autocomplete="new-password"
          ></el-input>
        </el-form-item>
        <el-button type="primary" class="login-item" @click="doLogin" :loading="loading">登录</el-button>
      </el-form>
    </div>
    <div class="login-tip"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ElForm } from 'element-plus';
import md5 from 'md5';
import { ElMessage } from 'element-plus';
import { loginApi } from '@/api/modules/login';
import { useUserStore } from '@/stores/modules/user';
defineOptions({
  name: 'Login'
});

const userStore = useUserStore();

// 表单对象
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginForm = ref({
  username: '',
  password: ''
});

// 表单规则
const loginRules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};

// loading
const loading = ref(false);

// 登录
const doLogin = () => {
  if (!loginFormRef.value) return;
  loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      try {
        // 1.执行登录接口
        const { data } = await loginApi({
          username: loginForm.value.username,
          password: md5(loginForm.value.password)
        });
        userStore.setToken(data.access_token);
      } catch (error: any) {
        ElMessage.error(error.message);
      } finally {
        loading.value = false;
      }
    }
  });
};
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
