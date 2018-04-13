/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-13 09:27:08
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import createHashHistory from 'history/createHashHistory';


/**
 *****************************************
 * 生成历史对象
 *****************************************
 */
export default function createHistory({ ...options } = {}) {
    let history = createHashHistory(options),
        model = {
            method: 'REPLACE',
            histories: []
        };

    // 监听路由变化
    history.listen(location => console.log(location.pathname));

    // 返回接口
    return {
        get method() {
            return model.method;
        },
        get pathname() {
            return history.location.pathname;
        },
        get histories() {
            return model.histories;
        },
        get length() {
            return model.histories.length;
        }
    };
}


