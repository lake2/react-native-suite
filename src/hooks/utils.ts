// create by LH (lake2@qq.com) at 2020-04-01 18:57:43
import lodash_throttle from 'lodash.throttle';

// 当使用navigation push的时候，如果快速连续点击，会导致页面入栈两次
// 用节流函数来限制一下
export function throttle<T extends (args: any) => void>(fn: T) {
    return lodash_throttle(fn, 300, { trailing: false }) as T;
}
