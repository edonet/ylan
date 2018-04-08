/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-31 23:55:01
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import map from './map';


/**
 *****************************************
 * 创建【url】路径
 *****************************************
 */
export function path(url, params) {

    // 判断存在参数
    if (url) {

        // 生成查询字符器
        params = query(params);

        // 判断参数有效
        if (params) {
            let idx = url.indexOf('#'),
                hash = '';

            // 获取【hash】
            if (idx !== -1) {
                hash = url.substring(idx);
                url = url.substring(0, idx);
            }

            // 拼接路径
            return url + (url.indexOf('?') !== -1 ? '&' : '?') + params + hash;
        }
    }

    // 返回【url】
    return url;
}


/**
 *****************************************
 * 生成查询参数
 *****************************************
 */
export function query(data, name) {

    // 生成键值对
    if (name) {
        let type = typeof data,
            mapped;

        // 处理字符串
        if (type === 'string') {
            return name + '=' + encodeURIComponent(data);
        }

        // 处理数字
        if (type === 'number') {
            return name + '=' + data;
        }

        // 处理布尔值
        if (type === 'boolean') {
            return name + '=' + (data ? 1 : 0);
        }

        // 定义映射函数
        mapped = map((val, key) => query(val, name + '[' + key + ']'));

        // 处理数组及对象
        return mapped(data).join('&');
    }

    // 处理对象
    if (data && typeof data === 'object') {
        return Object.keys(data).map(key => query(data[key], key)).join('&');
    }

    // 默认返回空
    return '';
}
