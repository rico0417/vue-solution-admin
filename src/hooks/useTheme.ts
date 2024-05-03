import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
import { DEFAULT_PRIMARY } from '@/config';
import { useGlobalStore } from '@/stores/modules/global';
import { getLightColor, getDarkColor } from '@/utils/color';
import { menuTheme } from '@/styles/theme/menu';
import { asideTheme } from '@/styles/theme/aside';
import { headerTheme } from '@/styles/theme/header';

/**
 * @description 全局主题 hooks
 * */
export const useTheme = () => {
  const globalStore = useGlobalStore();
  const { primary, isDark, isGrey, isWeak, layout, asideInverted, headerInverted } = storeToRefs(globalStore);

  /**
   * 切换暗黑模式 需要同时修改主体颜色、侧边栏（自定义）、头部（自定义）
   * 给根标签（html）加dark属性还不够（只能使主体部分变色，但是侧边栏和头部用的是自定义颜色属性，也需要同步变化）
   * 需要将侧边栏和头部颜色一起变色
   */
  const switchDark = () => {
    const html = document.documentElement as HTMLElement;
    if (isDark.value) html.setAttribute('class', 'dark');
    else html.setAttribute('class', '');
    changePrimary(primary.value);
    setAsideTheme();
    setHeaderTheme();
  };

  // 修改主题颜色
  const changePrimary = (val: string | null) => {
    if (!val) {
      val = DEFAULT_PRIMARY;
      ElMessage({ type: 'success', message: `主题颜色已重置为 ${DEFAULT_PRIMARY}` });
    }
    // 计算主题颜色变化
    document.documentElement.style.setProperty('--el-color-primary', val);
    // 生成暗色
    document.documentElement.style.setProperty(
      '--el-color-primary-dark-2',
      isDark.value ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`
    );
    // 生成9个等级的亮色
    for (let i = 1; i <= 9; i++) {
      const primaryColor = isDark.value ? `${getDarkColor(val, i / 10)}` : `${getLightColor(val, i / 10)}`;
      document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor);
    }
    globalStore.setGlobalState('primary', val);
  };

  // 灰色和弱色切换
  const changeGreyOrWeak = (type: string, value: boolean) => {
    // 获取body标签
    const body = document.body as HTMLElement;
    // 如果value为false，移除body上的style属性，并中断当前方法
    if (!value) return body.removeAttribute('style');
    const styles: Record<string, string> = {
      grey: 'filter: grayscale(1)',
      weak: 'filter: invert(80%)'
    };
    // 在body标签上插入style属性
    body.setAttribute('style', styles[type]);
    const propName = type === 'grey' ? 'isWeak' : 'isGrey';
    globalStore.setGlobalState(propName, false);
  };

  // 设置菜单样式
  const setMenuTheme = () => {
    let type: string = 'light';
    // 布局为“横向”布局时，头部反转色生效（横向布局的侧边栏为头部）
    if (layout.value === 'transverse' && headerInverted.value) type = 'inverted';
    // 布局非“横向”布局时，侧边栏反转色生效
    if (layout.value !== 'transverse' && asideInverted.value) type = 'inverted';
    // 最终以是否开启暗色为准（如果为暗色的话，覆盖之前的type）
    if (isDark.value) type = 'dark';
    const theme = menuTheme[type];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value as string);
    }
  };

  // 设置侧边栏样式
  const setAsideTheme = () => {
    let type: string = 'light';
    if (asideInverted.value) type = 'inverted';
    if (isDark.value) type = 'dark';
    const theme = asideTheme[type];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value as string);
    }
    setMenuTheme();
  };

  // 设置头部样式
  const setHeaderTheme = () => {
    let type: string = 'light';
    if (headerInverted.value) type = 'inverted';
    if (isDark.value) type = 'dark';
    const theme = headerTheme[type];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value as string);
    }
    setMenuTheme();
  };

  // init theme
  const initTheme = () => {
    switchDark();
    if (isGrey.value) changeGreyOrWeak('grey', true);
    if (isWeak.value) changeGreyOrWeak('weak', true);
  };

  return {
    initTheme,
    switchDark,
    changePrimary,
    changeGreyOrWeak,
    setAsideTheme,
    setHeaderTheme
  };
};
