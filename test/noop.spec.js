/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-09 16:08:43
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import noop, { truthy, falsy, argv, args } from '../lib/noop';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【noop】', () =>{
    test('测试常量函数', () => {

        // 校验空操作
        expect(noop()).toBeUndefined();
        expect(noop(true)).toBeUndefined();
        expect(noop(false)).toBeUndefined();
        expect(noop(null)).toBeUndefined();
        expect(noop([])).toBeUndefined();
        expect(noop({})).toBeUndefined();

        // 校验真操作
        expect(truthy()).toBeTruthy();
        expect(truthy(true)).toBeTruthy();
        expect(truthy(false)).toBeTruthy();
        expect(truthy(null)).toBeTruthy();
        expect(truthy([])).toBeTruthy();
        expect(truthy({})).toBeTruthy();

        // 校验假操作
        expect(falsy()).toBeFalsy();
        expect(falsy(true)).toBeFalsy();
        expect(falsy(false)).toBeFalsy();
        expect(falsy(null)).toBeFalsy();
        expect(falsy([])).toBeFalsy();
        expect(falsy({})).toBeFalsy();

        // 校验第一参数
        expect(argv()).toBe(undefined);
        expect(argv(true)).toBe(true);
        expect(argv(false)).toBe(false);
        expect(argv(null)).toBe(null);
        expect(argv(123)).toBe(123);
        expect(argv('123')).toBe('123');
        expect(argv([])).toEqual([]);
        expect(argv({})).toEqual({});

        // 校验参数列表
        expect(args()).toEqual([]);
        expect(args(true)).toEqual([true]);
        expect(args(false)).toEqual([false]);
        expect(args(null)).toEqual([null]);
        expect(args(123)).toEqual([123]);
        expect(args('123')).toEqual(['123']);
        expect(args([])).toEqual([[]]);
        expect(args({})).toEqual([{}]);
    });
});
