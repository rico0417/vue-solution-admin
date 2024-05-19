import type { FunctionArgs } from '@vueuse/core';
// 创建了一个使用 requestAnimationFrame 来节流函数执行的工具函数。它确保在动画帧之间最多只执行一次传入的函数，从而提高性能和减少计算。
export function useRafThrottle<T extends FunctionArgs>(fn: T): T {
  let locked = false;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return function (...args: any[]) {
    if (locked) return;
    locked = true;
    window.requestAnimationFrame(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fn.apply(this, args);
      locked = false;
    });
  };
}
