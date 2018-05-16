/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-15 18:04:37
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import axios from 'axios';
import { path } from './url';


/**
 *****************************************
 * 请求数据
 *****************************************
 */
export default function ajax({ method = 'get', url, params, data, ...settings }) {

    // 合并参数
    if (method === 'get') {
        settings.method = 'get';
        settings.url = path(url, { ...params, ...data });
    } else {
        settings.method = 'post';
        settings.url = path(url, params);
        settings.data = data;
    }

    // 发送请求
    return axios(settings);
}


/**
 *****************************************
 * 发送【GET】请求
 *****************************************
 */
export function get(url, params) {
    return ajax({ method: 'get', url, params });
}


/**
 *****************************************
 * 发送【POST】请求
 *****************************************
 */
export function post(url, data) {
    return ajax({ method: 'post', url, data });
}
