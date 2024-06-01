<template>
  <el-drawer v-model="themeSettings" title="布局设置" size="290px">
    <!-- 布局样式 -->
    <el-divider class="divider" content-position="center">
      <el-icon><Notification /></el-icon>
      布局样式
    </el-divider>
    <div class="layout-box">
      <el-tooltip effect="dark" content="纵向" placement="top" :show-after="200">
        <div
          :class="['layout-item layout-vertical', { 'is-active': layout == 'vertical' }]"
          @click="setLayout('vertical')"
        >
          <div class="layout-dark"></div>
          <div class="layout-container">
            <div class="layout-light"></div>
            <div class="layout-content"></div>
          </div>
          <el-icon v-if="layout == 'vertical'">
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="经典" placement="top" :show-after="200">
        <div
          :class="['layout-item layout-classic', { 'is-active': layout == 'classic' }]"
          @click="setLayout('classic')"
        >
          <div class="layout-dark"></div>
          <div class="layout-container">
            <div class="layout-light"></div>
            <div class="layout-content"></div>
          </div>
          <el-icon v-if="layout == 'classic'">
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="横向" placement="top" :show-after="200">
        <div
          :class="['layout-item layout-transverse', { 'is-active': layout == 'transverse' }]"
          @click="setLayout('transverse')"
        >
          <div class="layout-dark"></div>
          <div class="layout-content"></div>
          <el-icon v-if="layout == 'transverse'">
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="分栏" placement="top" :show-after="200">
        <div
          :class="['layout-item layout-columns', { 'is-active': layout == 'columns' }]"
          @click="setLayout('columns')"
        >
          <div class="layout-dark"></div>
          <div class="layout-light"></div>
          <div class="layout-content"></div>
          <el-icon v-if="layout == 'columns'">
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>
    </div>
    <div class="theme-item">
      <span>
        侧边栏反转色
        <el-tooltip effect="dark" content="侧边栏颜色变为深色模式" placement="top">
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </span>
      <el-switch v-model="asideInverted" @change="setAsideTheme" />
    </div>
    <div class="theme-item mb50">
      <span>
        头部反转色
        <el-tooltip effect="dark" content="头部颜色变为深色模式" placement="top">
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </span>
      <el-switch v-model="headerInverted" @change="setHeaderTheme" />
    </div>

    <!-- 全局主题 -->
    <el-divider class="divider" content-position="center">
      <el-icon><ColdDrink /></el-icon>
      全局主题
    </el-divider>
    <div class="theme-item">
      <span>主题颜色</span>
      <el-color-picker v-model="primary" :predefine="colorList" @change="changePrimary" />
    </div>
    <div class="theme-item">
      <span>暗黑模式</span>
      <SwitchDark />
    </div>
    <div class="theme-item">
      <span>灰色模式</span>
      <el-switch v-model="isGrey" @change="changeGreyOrWeak('grey', !!$event)" />
    </div>
    <div class="theme-item mb40">
      <span>色弱模式</span>
      <el-switch v-model="isWeak" @change="changeGreyOrWeak('weak', !!$event)" />
    </div>

    <!-- 界面设置 -->
    <el-divider class="divider" content-position="center">
      <el-icon><Setting /></el-icon>
      界面设置
    </el-divider>
    <div class="theme-item">
      <span>水印</span>
      <el-switch v-model="isWaterMark" @change="changeWaterMark" />
    </div>
    <div class="theme-item">
      <span>菜单折叠</span>
      <el-switch v-model="isCollapse" />
    </div>
    <div class="theme-item">
      <span>菜单手风琴</span>
      <el-switch v-model="accordion" />
    </div>
    <div class="theme-item">
      <span>面包屑</span>
      <el-switch v-model="breadcrumb" />
    </div>
    <div class="theme-item">
      <span>面包屑图标</span>
      <el-switch v-model="breadcrumbIcon" />
    </div>
    <div class="theme-item">
      <span>标签栏</span>
      <el-switch v-model="tabs" />
    </div>
    <div class="theme-item">
      <span>标签栏图标</span>
      <el-switch v-model="tabsIcon" />
    </div>
    <div class="theme-item">
      <span>页脚</span>
      <el-switch v-model="footer" />
    </div>
    <div class="theme-item">
      <span>右键弹窗风格</span>
      <el-dropdown trigger="click">
        <span class="right-click-theme-side-style"> {{ rightClickTheme }} </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item of rightClickTypeList"
              :key="item.label"
              @click="rightClickTypeChange(item.label)"
              >{{ item.label }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTheme } from '@/hooks/useTheme';
import { useGlobalStore } from '@/stores/modules/global';
import { DEFAULT_PRIMARY } from '@/config';
import SwitchDark from '@/components/SwitchDark/index.vue';
import { useWatermark } from '@/hooks/useWatermark';

defineOptions({
  name: 'ThemeDrawer'
});

const { changePrimary, changeGreyOrWeak, setAsideTheme, setHeaderTheme } = useTheme();
const { setWatermark, clearAll } = useWatermark();

const globalStore = useGlobalStore();
const {
  layout,
  primary,
  isGrey,
  isWeak,
  asideInverted,
  headerInverted,
  isCollapse,
  isWaterMark,
  accordion,
  breadcrumb,
  breadcrumbIcon,
  tabs,
  tabsIcon,
  footer,
  themeSettings,
  rightClickTheme
} = storeToRefs(globalStore);

// 预定义主题颜色
const colorList = [
  DEFAULT_PRIMARY,
  '#daa96e',
  '#0c819f',
  '#409eff',
  '#27ae60',
  '#ff5c93',
  '#e74c3c',
  '#fd726d',
  '#f39c12',
  '#9b59b6'
];

// 设置布局方式
const setLayout = (val: any) => {
  globalStore.setGlobalState('layout', val);
  setAsideTheme();
};

const changeWaterMark = () => {
  if (isWaterMark.value) {
    setWatermark('welcome');
  } else {
    clearAll();
  }
};

const rightClickTypeList = [
  {
    value: 'default',
    label: 'default'
  },
  {
    value: 'flat',
    label: 'flat'
  },
  {
    value: 'win10',
    label: 'win10'
  },
  {
    value: 'mac',
    label: 'mac'
  }
];

const rightClickTypeChange = (type: string) => {
  globalStore.setGlobalState('rightClickTheme', type);
};
</script>

<style lang="scss" scoped>
.divider {
  margin-top: 15px;
  .el-icon {
    position: relative;
    top: 2px;
    right: 5px;
    font-size: 15px;
  }
}
.theme-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  margin: 14px 0;
  span {
    display: flex;
    align-items: center;
    font-size: 14px;
    .el-icon {
      margin-left: 3px;
      font-size: 15px;
      color: var(--el-text-color-regular);
      cursor: pointer;
    }
  }
  .right-click-theme-side-style {
    width: 80px;
    padding: 5px 0;
    border: 1px solid var(--el-border-color);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.layout-box {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px 7px 0;
  .layout-item {
    position: relative;
    box-sizing: border-box;
    width: 100px;
    height: 70px;
    padding: 6px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 0 5px 1px var(--el-border-color-dark);
    transition: all 0.2s;
    .layout-dark {
      background-color: var(--el-color-primary);
      border-radius: 3px;
    }
    .layout-light {
      background-color: var(--el-color-primary-light-5);
      border-radius: 3px;
    }
    .layout-content {
      background-color: var(--el-color-primary-light-8);
      border: 1px dashed var(--el-color-primary);
      border-radius: 3px;
    }
    .el-icon {
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: var(--el-color-primary);
      transition: all 0.2s;
    }
    &:hover {
      box-shadow: 0 0 5px 1px var(--el-text-color-secondary);
    }
  }
  .is-active {
    box-shadow: 0 0 0 2px var(--el-color-primary) !important;
  }
  .layout-vertical {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .layout-dark {
      width: 20%;
    }
    .layout-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 72%;
      .layout-light {
        height: 20%;
      }
      .layout-content {
        height: 67%;
      }
    }
  }
  .layout-classic {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
    .layout-dark {
      height: 22%;
    }
    .layout-container {
      display: flex;
      justify-content: space-between;
      height: 70%;
      .layout-light {
        width: 20%;
      }
      .layout-content {
        width: 70%;
      }
    }
  }
  .layout-transverse {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 15px;
    .layout-dark {
      height: 20%;
    }
    .layout-content {
      height: 67%;
    }
  }
  .layout-columns {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .layout-dark {
      width: 14%;
    }
    .layout-light {
      width: 17%;
    }
    .layout-content {
      width: 55%;
    }
  }
}
</style>
