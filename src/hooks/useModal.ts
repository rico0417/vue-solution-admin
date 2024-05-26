import { AppContext, Component, ComponentPublicInstance, createVNode, getCurrentInstance, render, VNode } from 'vue';

export interface Options {
  visible?: boolean;
  onClose?: () => void;
  appendTo?: HTMLElement | string;
  [key: string]: unknown;
}

export interface CommandComponent {
  (options: Options): VNode;
  close: () => void;
}

const getAppendToElement = (props: Options): HTMLElement => {
  let appendTo: HTMLElement | null = document.body;
  if (props.appendTo) {
    if (typeof props.appendTo === 'string') {
      appendTo = document.querySelector<HTMLElement>(props.appendTo);
    }
    if (props.appendTo instanceof HTMLElement) {
      appendTo = props.appendTo;
    }
    if (!(appendTo instanceof HTMLElement)) {
      appendTo = document.body;
    }
  }
  return appendTo;
};

const initInstance = <T extends Component>(
  Component: T,
  props: Options,
  container: HTMLElement,
  appContext: AppContext | null = null
) => {
  const vNode = createVNode(Component, props);
  vNode.appContext = appContext;
  render(vNode, container);

  getAppendToElement(props).appendChild(container);
  return vNode;
};

export const useModal = <T extends Component>(Component: T): CommandComponent => {
  const appContext = getCurrentInstance()?.appContext;
  if (appContext) {
    // 传入的弹窗组件就可以顺利的获取到app和当前组件树的provides
    const currentProvides = (getCurrentInstance() as any)?.provides;
    Reflect.set(appContext, 'provides', { ...appContext.provides, ...currentProvides });
  }

  const container = document.createElement('div');

  // 默认的关闭弹窗方法
  const close = () => {
    render(null, container);
    container.parentNode?.removeChild(container);
  };

  const CommandComponent = (options: Options): VNode => {
    // 判断options是否有visible属性，如果没有就将其赋值为true
    if (!Reflect.has(options, 'visible')) {
      options.visible = true;
    }
    if (typeof options.onClose !== 'function') {
      // 如果没有自定义弹窗方法，则使用默认的弹窗方法
      options.onClose = close;
    } else {
      // 如果有自定义弹窗方法，则和默认的弹窗方法一起使用
      const originOnClose = options.onClose;
      options.onClose = () => {
        originOnClose();
        close();
      };
    }
    // 初始化弹窗dom
    const vNode = initInstance<T>(Component, options, container, appContext);
    const vm = vNode.component?.proxy as ComponentPublicInstance<Options>;
    for (const prop in options) {
      if (Reflect.has(options, prop) && !Reflect.has(vm.$props, prop)) {
        vm[prop as keyof ComponentPublicInstance] = options[prop];
      }
    }
    return vNode;
  };

  CommandComponent.close = close;

  return CommandComponent;
};

export default useModal;
