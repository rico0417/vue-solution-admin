<template>
  <el-dropdown trigger="click">
    <div class="header-userInfo-box">
      <img class="head-icon" src="@/assets/images/icon.jpg" fit="cover" />
      <div class="head-text">Vue Admin</div>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <el-icon><User /></el-icon>
          <span>个人中心</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <el-icon><Edit /></el-icon>
          <span>修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided @click="logout">
          <el-icon><SwitchButton /></el-icon>
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ElMessageBox, ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';
import { logoutApi } from '@/api/modules/login';
import { LOGIN_URL } from '@/config';

defineOptions({ name: 'UserInfo' });

const router = useRouter();
const userStore = useUserStore();

// 退出登录
const logout = () => {
  ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    // 1.执行退出登录接口
    await logoutApi();

    // 2.清除 Token
    userStore.setToken('');

    // 3.重定向到登陆页
    router.replace(LOGIN_URL);
    ElMessage.success('退出登录成功！');
  });
};
</script>

<style lang="scss" scoped>
.header-userInfo-box {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  max-width: 230px;
  height: 55px;
  padding: 0 10px;
  cursor: pointer;
  .head-icon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    background-color: red;
    border-radius: 50%;
  }
  .head-text {
    max-width: 174px;
    overflow: hidden;
    font-size: 14px;
    color: #001529;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:hover {
    background-color: #f6f6f6;
  }
}
</style>
