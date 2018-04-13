/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-01 19:48:58
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { isFunction } from './validate';


/**
 *****************************************
 * 创建观察者
 *****************************************
 */
export default function observer() {
    let listeners = [],
        model = {};


    // 添加监听
    model.subscribe = cb => {

        // 添加监听回调
        isFunction(cb) && listeners.push(cb);

        // 返回取消监听函数
        return () => {
            listeners = listeners.filter(fn => fn !== cb);
        };
    };

    // 发布信息
    model.notify = function notify(...args) {
        listeners.forEach(cb => cb.apply(this, args));
    };

    // 清除监听
    model.clear = () => listeners = [];

    // 返回数据接口
    return model;
}
