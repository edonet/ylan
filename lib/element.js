/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-07 21:18:07
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 添加监听事件
 *****************************************
 */
export function addEvent(el, type, listener) {

    // 添加事件
    el.addEventListener(type, listener, false);

    // 移除事件
    return () => {
        el.removeEventListener(type, listener, false);
    };
}
