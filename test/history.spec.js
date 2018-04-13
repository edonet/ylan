/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-02 09:04:45
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import createMemoryHistory from 'history/createMemoryHistory';
import createHistory from '../lib/history';


/**
 *****************************************
 * 测试【history】
 *****************************************
 */
describe('测试【history】', () => {
    let history, state;

    /* 测试前执行 */
    beforeEach(() => {

        // 销毁对象
        history && history.destroy();

        // 创建历史对象
        history = createHistory(null, createMemoryHistory());

        // 清空状态
        history.replace('/');
        state = null;

        // 添加监听
        history.subscribe(
            data => state && expect(data).toEqual(state)
        );
    });


    /* 创建【history】 */
    test('创建【history】', () => {

        // 校验初始状态
        expect(history.pathname).toBe('/');
        expect(history.method).toBe(history.actionTypes.replace);
        expect(history.histories).toEqual(['/']);
        expect(history).toHaveLength(1);
    });

    /* 跳转到路径 */
    test('跳转到路径', () => {

        // 定义状态
        state = {
            method: history.actionTypes.push,
            pathname: '/index',
            histories: ['/', '/index'],
            length: 2
        };

        // 跳转到页面
        history.go(state.pathname);

        // 定义状态
        state = {
            method: history.actionTypes.push,
            pathname: '/index/user',
            histories: ['/', '/index', '/index/user'],
            length: 3
        };

        // 跳转到页面
        history.go(state.pathname);
    });

    /* 替换到路径 */
    test('替换到路径', () => {

        // 跳转到页面
        history.go('/user');

        // 定义状态
        state = {
            method: history.actionTypes.replace,
            pathname: '/about',
            histories: ['/', '/about'],
            length: 2
        };

        // 替换到页面
        history.replace(state.pathname);

        // 定义状态
        state = {
            method: history.actionTypes.replace,
            pathname: '/user',
            histories: ['/', '/user'],
            length: 2
        };

        // 替换到页面
        history.replace(state.pathname);
    });

    /* 返回指定步数 */
    test('返回指定步数', () => {

        // 跳转到路径
        history.go('/index');
        history.go('/index/user');
        history.go('/index/about');
        history.go('/user');

        // 定义状态
        state = {
            method: history.actionTypes.pop,
            pathname: '/index/about',
            histories: ['/', '/index', '/index/user', '/index/about'],
            length: 4
        };

        // 返回
        history.goBack();

        // 定义状态
        state = {
            method: history.actionTypes.pop,
            pathname: '/index',
            histories: ['/', '/index'],
            length: 2
        };

        // 返回2步
        history.goBack(2);

        // 定义状态
        state = {
            method: history.actionTypes.replace,
            pathname: '/',
            histories: ['/'],
            length: 1
        };

        // 返回2步
        history.goBack(4, { method: history.actionTypes.replace });
    });

    /* 返回指定路径 */
    test('返回指定路径', () => {

        // 跳转到路径
        history.go('/index');
        history.go('/index/user');
        history.go('/index/about');
        history.go('/user');

        // 定义状态
        state = {
            method: history.actionTypes.pop,
            pathname: '/index/about',
            histories: ['/', '/index', '/index/user', '/index/about'],
            length: 4
        };

        // 返回
        history.goBack('/user');

        // 返回上一页
        history.goBack(state.pathname);

        // 定义状态
        state = {
            method: history.actionTypes.push,
            pathname: '/index',
            histories: ['/', '/index'],
            length: 2
        };

        // 返回到指定页面
        history.goBack(state.pathname, { method: history.actionTypes.push });

        // 定义状态
        state = {
            method: history.actionTypes.pop,
            pathname: '/about',
            histories: ['/about'],
            length: 1
        };

        // 返回到不存在的页面
        history.goBack(state.pathname);

        // 定义状态
        state = {
            method: history.actionTypes.pop,
            pathname: '/index',
            histories: ['/index'],
            length: 1
        };

        // 返回到不存在的页面
        history.goBack(state.pathname);
    });
});
