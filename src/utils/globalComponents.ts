import type { App, Component } from 'vue';

export type CustomComponent = Component & { displayName?: string };

type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};

export type WithInstall<T> = T & {
  install(app: App<Element>): void;
} & EventShim;

// 函数 withInstall，用于为组件添加安装功能
export const withInstall = <T extends CustomComponent>(component: T, alias?: string) => {
  // 将传入的组件转换为记录类型，以便添加 install 属性
  (component as Record<string, unknown>).install = (app: App<Element>) => {
    // 获取组件的名称，可以通过 component.name 或 component.displayName 属性获取
    const compName = component.name || component.displayName;
    if (!compName) {
      // 如果名称不存在，则直接返回
      return;
    }
    // 使用 app.component 方法将组件注册到应用中，使用获取到的名称作为键
    app.component(compName, component);
    if (alias) {
      // 如果提供了别名，则将组件也注册到全局属性中，使用别名作为键
      app.config.globalProperties[alias] = component;
    }
  };
  // 返回装饰后的组件，仍然是类型为 T 的组件
  return component as WithInstall<T>;
};
