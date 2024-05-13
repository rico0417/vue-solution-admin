import type { FunctionArgs } from '@vueuse/core';

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
