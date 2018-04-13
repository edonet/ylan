/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-01 19:41:48
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import createHashHistory from 'history/createHashHistory';
import createObserver from './observer';


/**
 *****************************************
 * 定义行为类型
 *****************************************
 */
const actionTypes = {
    push: 'PUSH', pop: 'POP', replace: 'REPLACE'
};


/**
 *****************************************
 * 创造历史对象
 *****************************************
 */
export default function createHistory(options, history) {
    let { notify, subscribe } = createObserver(),
        model = {},
        unlisten;


    /* 创建历史对象 */
    model.history = history || createHashHistory({
        getUserConfirmation: (message, callback) => window && callback(window.confirm(message)),
        ...options
    });

    /* 初始化数据 */
    model.method = actionTypes.replace;
    model.pathname = model.history.location.pathname;
    model.histories = [model.pathname];
    model.state = null;

    /* 监听历史记录变化 */
    unlisten = model.history.listen(updateHistory(model, notify));

    /* 返回接口 */
    return {
        subscribe,
        actionTypes,
        go: goState(model),
        replace: replaceState(model),
        goBack: goBackState(model),
        get method() { return model.method; },
        get pathname() { return model.history.location.pathname; },
        get histories() { return model.histories; },
        get length() { return model.histories.length; },
        destroy() {
            if (unlisten) {
                unlisten = unlisten();
                model.history.goBack(model.histories.length - 1);
            }
        }
    };
}


/**
 *****************************************
 * 获取历史对象信息
 *****************************************
 */
function updateHistory(model, notify) {
    return function update({ pathname }, action) {
        let state = model.state,
            histories = model.histories,
            callback = notify,
            method = action,
            idx;


        // 忽略同一跳转
        if (pathname === model.pathname) {
            return model.state = null;
        }

        // 处理状态
        if (state && state.pathname === pathname && state.action === action) {
            method = state.method || action;
            callback = state.next || notify;
        } else {
            idx = histories.lastIndexOf(pathname);
            method = action = idx > -1 ? actionTypes.pop : actionTypes.push;
        }

        // 更新路由记录
        switch (action) {
            case actionTypes.push:
                histories = histories.concat([pathname]);
                break;
            case actionTypes.replace:
                histories = histories.slice(0, -1).concat([pathname]);
                break;
            case actionTypes.pop:
                histories = histories.slice(0, Math.max(0, (idx || histories.lastIndexOf(pathname)) + 1));
                break;
            default:
                break;
        }

        // 更新数据模型
        model.pathname = pathname;
        model.method = method;
        model.histories = histories;
        model.state = null;

        // 执行更新回调
        return callback({
            pathname, method, histories, length: histories.length
        });
    };
}


/**
 *****************************************
 * 跳转到指定路径
 *****************************************
 */
function goState(model) {
    return function go(pathname, { method = actionTypes.push } = {}) {

        // 忽略同一跳转
        if (pathname === model.pathname) {
            return false;
        }

        // 更新状态
        model.state = { method, pathname, action: actionTypes.push };
        return model.history.push(pathname);
    };
}


/**
 *****************************************
 * 替换到指定路径
 *****************************************
 */
function replaceState(model) {
    return function replace(pathname, { method = actionTypes.replace } = {}) {

        // 忽略同一跳转
        if (pathname === model.pathname) {
            return false;
        }

        // 更新状态
        model.state = { method, pathname, action: actionTypes.replace };
        return model.history.replace(pathname);
    };
}


/**
 *****************************************
 * 返回到指定路径
 *****************************************
 */
function goBackState(model) {
    return function goBack(step = 1, { method = actionTypes.pop } = {}) {
        let histories = model.histories,
            maxStep = histories.length - 1,
            argType = typeof step;

        // 按步数返回
        if (argType === 'number') {

            // 判断是否可以返回
            if (maxStep) {

                // 获取返回步数
                step = Math.min(maxStep, Math.abs(step));

                // 判断步数不为【0
                if (step) {

                    // 更新状态
                    model.state = {
                        method,
                        pathname: histories[maxStep - step],
                        action: actionTypes.pop
                    };

                    // 返回路径
                    return model.history.go(- step);
                }
            }

            // 无需处理
            return;
        }

        // 返回到指定路径
        if (argType === 'string') {
            let idx = histories.lastIndexOf(step),
                pathname = step;

            // 获取返回步数
            step = maxStep - idx;

            // 处理返回
            if (idx > -1) {

                if (step && maxStep) {

                    // 更新状态
                    model.state = { method, pathname, action: actionTypes.pop };
                    model.history.go(- step);
                }

            } else {
                let next = () => {
                        model.state = { method, pathname, action: actionTypes.replace };
                        model.history.replace(pathname);
                    };

                // 判断可返回数
                if (maxStep) {

                    // 更新状态
                    model.state = {
                        pathname: histories[0],
                        action: actionTypes.pop,
                        next
                    };

                    // 返回路径
                    model.history.go(- maxStep);
                } else {
                    next();
                }
            }
        }
    };
}
