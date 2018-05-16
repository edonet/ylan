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
import * as qs from './qs';


/**
 *****************************************
 * 创建【url】路径
 *****************************************
 */
export function path(url, params, hash = '') {
    let idx = url.indexOf('#'),
        query = params ? qs.stringify(params) : '';

    // 获取【hash】
    if (idx > -1) {
        hash = hash || url.substring(idx + 1);
        url = url.substring(0, idx);
    }

    // 查找【query】
    idx = url.indexOf('?');

    // 获取【query】
    if (idx > -1) {
        params = qs.encode(url.substring(idx + 1));
        query = params && query ? params + '&' + query : params || query;
        url = url.substring(0, idx);
    }

    // 拼接路径
    return url + (query && '?' + query) + (hash && '#' + hash);
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
            return qs.parse(url.substring(idx + 1));
        }
    }

    // 返回空对象
    return {};
}
