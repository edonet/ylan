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
export default function each(callback) {
    return function extract(data) {

        // 判断是否为对象
        if (data && typeof data === 'object') {

            // 判断支持【map】接口
            if ('forEach' in data) {
                return data.forEach(callback);
            }

            // 处理对象
            return Object.keys(data).forEach(
                (key, idx) => callback.call(data, data[key], key, idx)
            );
        }

        // 返回空数组
        return [];
    };
}
