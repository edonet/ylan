/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-09 12:45:10
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import each from './each';
import compose from './compose';


/**
 *****************************************
 * 定义变量
 *****************************************
 */
const
    bool = { 'true': true, 'false': false },
    num = /^[0-9.]+$/;


/**
 *****************************************
 * 转码字符串
 *****************************************
 */
export const escape = encodeURIComponent;
export const unescape = decodeURIComponent;


/**
 *****************************************
 * 序列化查询字符串
 *****************************************
 */
export function stringify(data, sep = '&', eq = '=', name = '') {

    // 生成键值对
    if (name) {
        let type = typeof data;

        // 处理字符串
        if (type === 'string') {
            return name + eq + escape(data);
        }

        // 处理数字
        if (type === 'number') {
            return name + eq + data;
        }

        // 处理布尔值
        if (type === 'boolean') {
            return name + eq + (data ? 'true' : 'false');
        }
    }

    // 处理对象
    if (data && typeof data === 'object') {
        let list = [],
            add = compose(
                (val) => val && list.push(val),
                (val, key) => stringify(val, sep, eq, name ? name + '[' + escape(key) + ']' : escape(key))
            );

        // 遍历对象
        each(add)(data);

        // 拼接参数
        return list.join(sep);
    }

    // 默认返回空
    return '';
}


/**
 *****************************************
 * 解析查询字符串
 *****************************************
 */
export function parse(query, sep = '&', eq = '=') {

    // 校验参数
    if (query && typeof query === 'string') {
        let list = query.split(sep),
            data = [];

        // 遍历列表
        for (let str of list) {
            let [key, value] = str.split(eq),
                [name, ...list] = key.split('[');

            // 处理键
            name = unescape(name);
            list = list.map(val => val.slice(0, -1));

            // 创建值
            data[name] = props(data[name], list, valueify(value));
        }

        // 返回对象
        return data.length ? data : { ...data };
    }

    // 返回空
    return {};
}


/**
 *****************************************
 * 解析查询字符串值
 *****************************************
 */
function valueify(val) {
    return (
        val in bool ? bool[val] : (num.test(val) ? Number(val) : (val ? unescape(val) : true))
    );
}


/**
 *****************************************
 * 添加属性
 *****************************************
 */
function props(data, list, val) {

    // 处理子对象
    if (list.length) {
        let name = list.shift();

        // 处理属性
        if (name) {
            name = unescape(name);

            if (!data) {
                data = num.test(name) ? [] : {};
            }

            data[name] = props(data[name], list, val);
        } else {
            data = [...(data || []), props(null, list, val)];
        }

        // 返回子对象
        return data;
    }

    // 返回值
    return val;
}
