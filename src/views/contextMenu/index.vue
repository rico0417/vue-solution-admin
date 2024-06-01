<template>
  <div>
    <div class="horbox">
      <el-button @contextmenu="onContextMenu($event)">普通右键</el-button>
      <el-button>函数式右键</el-button>
      <el-button>组件式右键</el-button>
      <el-button>嵌套菜单右键</el-button>
    </div>

    <div>
      <!--this is component mode of context-menu-->
      <context-menu v-model:show="show" :options="options">
        <context-menu-item label="刷新">
          <template #icon>
            <el-icon><Refresh /></el-icon>
          </template>
        </context-menu-item>
        <context-menu-item label="最大化">
          <template #icon>
            <el-icon><Refresh /></el-icon>
          </template>
        </context-menu-item>
        <context-menu-separator></context-menu-separator>
        <context-menu-item label="关闭当前">
          <template #icon>
            <el-icon><Refresh /></el-icon>
          </template>
        </context-menu-item>
        <context-menu-item label="关闭左侧">
          <template #icon>
            <el-icon><Refresh /></el-icon>
          </template>
        </context-menu-item>
        <context-menu-item label="关闭右侧">
          <template #icon>
            <el-icon><Refresh /></el-icon>
          </template>
        </context-menu-item>
        <context-menu-separator></context-menu-separator>
        <context-menu-item label="关闭其它">
          <template #icon>
            <el-icon><Refresh /></el-icon>
          </template>
        </context-menu-item>
        <context-menu-item label="关闭所有">
          <template #icon>
            <el-icon><Refresh /></el-icon>
          </template>
        </context-menu-item>
      </context-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { defineComponent } from 'vue';

// export default defineComponent({
//   data() {
//     return {
//       show: false,
//       options: {
//         x: 500,
//         y: 200
//       }
//     };
//   },
//   methods: {
//     onContextMenu(e: MouseEvent) {
//       e.preventDefault();
//       //Set the mouse position
//       this.options.x = e.x;
//       this.options.y = e.y;
//       //Show menu
//       this.show = true;
//     }
//   }
// });
import { ref } from 'vue';

const show = ref(false);
const options = ref({
  x: 0,
  y: 0
});
const onContextMenu = (e: MouseEvent) => {
  e.preventDefault();
  //Set the mouse position
  options.value.x = e.x;
  options.value.y = e.y;
  //Show menu
  show.value = true;
};
</script>

<style></style>
