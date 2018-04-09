/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-09 21:54:31
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 延时执行
 *****************************************
 */
export default function delay(callback, duration = 0) {

    // 处理参数
    if (typeof callback === 'number') {
        duration = [callback, callback = duration][0];
    }

    // 返回【Promise】对象
    return new Promise(
        resolve => setTimeout(() => resolve(callback && callback()), duration)
    );
}
