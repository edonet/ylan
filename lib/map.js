/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-09 00:14:06
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 遍历对象
 *****************************************
 */
export default function map(callback) {
    return function mapped(data) {

        // 判断是否为对象
        if (data && typeof data === 'object') {

            // 判断支持【map】接口
            if ('map' in data) {
                return data.map(callback);
            }

            // 处理对象
            return Object.keys(data).map(
                (key, idx) => callback.call(data, data[key], key, idx)
            );
        }

        // 返回空数组
        return [];
    };
}
