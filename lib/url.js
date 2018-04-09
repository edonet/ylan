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
import { stringify, parse } from './qs';


/**
 *****************************************
 * 创建【url】路径
 *****************************************
 */
export function path(url, params) {

    // 判断存在参数
    if (url) {

        // 生成查询字符器
        params = stringify(params);

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
 * 获取路径参数
 *****************************************
 */
export function query(url) {

    // 处理【url】
    if (url && typeof url === 'string') {
        let idx = url.indexOf('#');

        // 过滤【hash】
        if (idx > -1) {
            url = url.substring(0, idx);
        }

        // 查找参数
        idx = url.indexOf('?');

        // 获取参数
        if (idx > -1) {
            return parse(url.substring(idx + 1));
        }
    }

    // 返回空对象
    return {};
}
