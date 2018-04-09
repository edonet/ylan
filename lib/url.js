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
import { stringify } from './qs';



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

