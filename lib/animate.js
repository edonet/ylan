/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-09 12:00:18
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { isFunction } from './validate';


/**
 *****************************************
 * 申请下一帧
 *****************************************
 */
export const rAF = window.rAF = (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    (callback => setTimeout(callback, 1000 / 60))
);


/**
 *****************************************
 * 取消下一帧
 *****************************************
 */
export const cAF = window.cAF = (
    window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    (id => clearTimeout(id))
);



/**
 *****************************************
 * 动画
 *****************************************
 */
export default function animate(duration, handler) {
    let cancel = false,
        start = + new Date(),
        callback = () => {
            if (cancel) {
                return false;
            }

            let lost = new Date() - start,
                progress = Math.min(1, lost / duration);

            if (handler(progress) !== false) {
                progress < 1 && rAF(callback);
            }
        };


    // 执行动画帧
    duration > 0 && rAF(callback);

    // 返回取消函数
    return { stop: () => cancel = true };
}


/**
 *****************************************
 * 缓动函数
 *****************************************
 */
export function easing(name) {
    switch (name) {
        case 'linear':
            return function (x) {
                return x;
            };
        case 'ease-in-out':
            return function (x) {
                return x - Math.sin(2 * Math.PI * x) / (2 * Math.PI);
            };
        case 'ease-in':
            return function (x) {
                return Math.pow(x, 3);
            };
        case 'ease-out':
            return function (x) {
                return Math.pow(x - 1, 3) + 1;
            };
        case 'back-in':
            return function (x) {
                var s = 1.70158; return x * x * ((s + 1) * x - s);
            };
        case 'back-out':
            return function (x) {
                x -= 1; var s = 1.70158; return x * x * ((s + 1) * x + s) + 1;
            };
        case 'elastic':
            return function (x) {
                return x < 0.4 ? Math.pow(2.5 * x, 3) : Math.sin(5 * x * Math.PI) * Math.cos(0.5 * x * Math.PI) / 3 + 1;
            };
        case 'bounce':
            return function (x) {
                var s = 7.5625,
                    p = 2.75;

                if (x < 1 / p) {
                    return s * x * x;
                } else if (x < 2 / p) {
                    x -= 1.5 / p;
                    return s * x * x + 0.75;
                } else if (x < 2.5 / p) {
                    x -= 2.25 / p;
                    return s * x * x + 0.9375;
                } else {
                    x -= 2.625 / p;
                    return s * x * x + 0.984375;
                }
            };
        default:
            return x => x;
    }
}


/**
 *****************************************
 * 帧过滤
 *****************************************
 */
export function throttle(callback, { leading = false } = {}) {
    let timeId = null,
        lastContext = null,
        lastArgs = null,
        result;


    // 校验参数
    if (!isFunction(callback)) {
        return null;
    }

    // 执行回调
    function invokeCallback() {

        // 执行回调
        if (!leading) {
            result = callback.apply(lastContext, lastArgs);
        }

        // 清空参数
        timeId = lastContext = lastArgs = null;
    }

    // 定义节流函数
    function throttled(...args) {

        // 判断是否回调前置
        if (leading) {

            // 前置执行
            if (!timeId) {
                result = callback.apply(this, args);
                timeId = rAF(invokeCallback);
            }

            // 返回结果
            return result;
        }

        // 定义执行回调
        if (!timeId) {
            timeId = rAF(invokeCallback);
        }

        // 缓存参数
        lastContext = this;
        lastArgs = args;

        // 返回结果
        return result;
    }

    // 定义取消函数
    throttled.cancel = () => timeId && cAF(timeId);

    // 返回节流函数
    return throttled;
}
