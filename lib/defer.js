/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-19 17:35:33
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 异步延时处理
 *****************************************
 */
export default function defer() {
    let resolve, reject, promise;

    // 生成【promise】对象
    promise = new Promise((resolveCallback, rejectCallback) => {
        resolve = resolveCallback;
        reject = rejectCallback;
    });

    // 返回接口
    return {
        promise, resolve, reject
    };
}
