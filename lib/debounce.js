/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-09 21:25:08
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
 * 去抖函数
 *****************************************
 */
export default function debounce(callback, duration = 500, { leading = false } = {}) {
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
        result = callback.apply(lastContext, lastArgs);
        timeId = lastContext = lastArgs = null;
    }

    // 开始计时器
    function startTimer() {
        timeId && clearTimeout(timeId);
        timeId = setTimeout(invokeCallback, duration);
    }

    // 清除计时器
    function clearTimer() {
        timeId && clearTimeout(timeId);
        timeId = null;
    }

    // 返回去抖函数
    function debounced(...args) {

        // 更新参数
        if (!timeId || !leading) {
            lastContext = this;
            lastArgs = args;
        }

        // 启动计时器
        startTimer();

        // 返回结果
        return result;
    }

    // 定义取消方法
    debounced.cancel = clearTimer;

    // 返回去抖动函数
    return debounced;
}
