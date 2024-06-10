<template>
  <div class="w-screen h-screen bg-gray-100 flex justify-center items-center">
    <div class="w-212 h-125 shadow-2xl bg-white rounded-3xl flex items-center p-5 box-border">
      <div class="sm:w-1/2 sm:flex h-full bg-blue-700 rounded-2xl hidden items-center box-border flex-col">
        <div class="mt-1/5">
          <img src="@/assets/images/login_logo.png" class="w-50 mb-5" />
          <div class="text-white text-5xl">Welcome</div>
        </div>
      </div>
      <div class="w-full sm:w-1/2 h-full box-border">
        <div class="pt-10 pr-7.5 pb-5 pl-7.5">
          <div class="text-4xl">Hello,Again</div>
          <div class="mt-2.5">We are happy to have you back.</div>
          <div class="mt-10">
            <el-form ref="loginFormRef" label-position="top" :model="loginForm" :rules="loginRules" size="large">
              <el-form-item prop="username">
                <el-input size="large" placeholder="username" v-model="loginForm.username"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  size="large"
                  placeholder="password"
                  type="password"
                  v-model="loginForm.password"
                  show-password
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="mt-15 flex flex-col">
            <el-button
              type="primary"
              class="w-full h-11.5 rounded-2"
              @click="doLogin"
              :disabled="loading"
              :loading="loading"
              >登录</el-button
            >
            <el-divider><span class="text-gray">OR</span></el-divider>
            <el-button
              class="w-full h-11.5 rounded-2"
              type="warning"
              @click="doReset"
              :disabled="loading"
              :loading="loading"
              >重置</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { ElForm } from 'element-plus';
import md5 from 'md5';
import { ElMessage } from 'element-plus';
import { loginApi } from '@/api/modules/login';
import { useUserStore } from '@/stores/modules/user';
import { useTabsStore } from '@/stores/modules/tabs';
import { useKeepAliveStore } from '@/stores/modules/keepAlive';
import { initDynamicRouter } from '@/routers/modules/dynamicRouter';
import { HOME_URL } from '@/config';

defineOptions({
  name: 'Login'
});

const router = useRouter();
const userStore = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();

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
        // 2.添加动态路由
        await initDynamicRouter();

        // 3.清空 tabs、keepAlive 数据
        tabsStore.setTabs([]);
        keepAliveStore.setKeepAliveName([]);
        // 跳转首页
        router.push(HOME_URL);
      } catch (error: any) {
        ElMessage.error(error.message);
      } finally {
        loading.value = false;
      }
    }
  });
};

// 重置
const doReset = () => {
  if (!loginFormRef.value) return;
  loginFormRef.value.resetFields();
};

// 监听回车键
onMounted(() => {
  // 监听 enter 事件（调用登录）
  document.onkeydown = (e: KeyboardEvent) => {
    e = (window.event as KeyboardEvent) || e;
    if (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter') {
      if (loading.value) return;
      doLogin();
    }
  };
});
</script>

<style lang="scss" scoped>
.el-input {
  :deep(.el-input__wrapper) {
    border-radius: 8px;
    &.is-focus {
      box-shadow: 0px 0px 0px 2px var(--el-input-focus-border-color) inset;
    }
  }
}
</style>
