/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-09 00:14:06
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 添加参数
 *****************************************
 */
import { isFunction } from './validate';


/**
 *****************************************
 * 遍历对象
 *****************************************
 */
export default function map(callback) {
    return isFunction(callback) && function apply(data) {

        // 过滤假值
        if (data) {

            // 处理可遍历对象
            if (data.length) {
                let result = [],
                    len = data.length,
                    i = 0;

                for (; i < len; i ++) {
                    result.push(callback.call(data, data[i], i));
                }

                // 结束处理
                return result;
            }

            // 处理对象
            if (typeof data === 'object') {

                // 判断支持【map】接口
                if ('map' in data) {
                    return data.map(callback);
                }

                // 处理对象
                return Object.keys(data).map(
                    (key, idx) => callback.call(data, data[key], key, idx)
                );
            }
        }

        // 返回结果
        return data;
    };
}
