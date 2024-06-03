<template>
  <div>
    <div class="contextMenu-demo">
      <el-button @contextmenu="contextDemo1">函数式嵌套菜单右键（包含嵌套）</el-button>
      <el-button @contextmenu="contextDemo2">组件式调用右键菜单（包含嵌套）</el-button>
    </div>
    <div>
      <span>相对来说，函数式嵌套菜单右键方式使用图标没有组件式轻松，如果需要在函数式中使用图标可以参考官方文档</span>
      <a href="https://docs.imengyu.top/vue3-context-menu-docs/guide/icon.html">链接</a>
      <span>个人更加推荐组件式调用方式，可DIY性更强些</span>
    </div>
    <!-- 组件 -->
    <TabContextMenuDemo1 v-model:show="show" :options="options"></TabContextMenuDemo1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ContextMenu from '@imengyu/vue3-context-menu';
import TabContextMenuDemo1 from './components/TabContextMenuDemo1.vue';

/**
 * 函数式嵌套菜单右键
 */
const contextDemo1 = (e: MouseEvent) => {
  e.preventDefault();
  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    items: [
      {
        label: '菜单1',
        onClick: () => {
          alert('You click a menu item');
        }
      },
      {
        label: '菜单2',
        onClick: () => {
          alert('You click a menu item');
        }
      },
      {
        label: '菜单3',
        onClick: () => {
          alert('You click a menu item');
        },
        divided: true
      },
      {
        label: '菜单4',
        onClick: () => {
          alert('You click a menu item');
        }
      },
      {
        label: '菜单5',
        onClick: () => {
          alert('You click a menu item');
        }
      },
      {
        label: '菜单6',
        onClick: () => {
          alert('You click a menu item');
        }
      },
      {
        label: '菜单7',
        onClick: () => {
          alert('You click a menu item');
        },
        divided: true
      },
      {
        label: '更多菜单',
        children: [
          { label: '菜单8' },
          {
            label: '菜单9',
            onClick: () => {
              alert('You click a menu item');
            }
          },
          { label: '菜单10' }
        ]
      }
    ]
  });
};

/**
 * 组件式调用右键菜单
 */
const show = ref(false);
const options = ref({
  x: 0,
  y: 0,
  theme: ''
});

const contextDemo2 = (e: MouseEvent) => {
  e.preventDefault();
  options.value.x = e.x;
  options.value.y = e.y;
  show.value = true;
};
</script>

<style></style>
