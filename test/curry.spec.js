/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-09 22:27:41
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import curry, { _ } from '../lib/curry';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【curry】', () => {

    /* 测试柯里化函数 */
    test('测试柯里化函数', () => {
        let cb = jest.fn(),
            each = (arr, fn) => arr.forEach((v, k) => fn(k, v)),
            fn = curry(each, 2)(_, cb);

        // 执行遍历
        fn([1, 2, 3]);

        // 校验结果
        expect(cb.mock.calls).toHaveLength(3);
        expect(cb.mock.calls[0]).toEqual([0, 1]);
        expect(cb.mock.calls[1]).toEqual([1, 2]);
        expect(cb.mock.calls[2]).toEqual([2, 3]);
    });

    /* 测试柯里化参数 */
    test('测试柯里化参数', () => {
        let fn = jest.fn((a, b, c, d) => (a + b + c) / d),
            cb = curry(fn);

        // 校验返回
        expect(cb(1, 2, 3, 4)).toBe(1.5);
        expect(cb(_, 2, 3, 4)(1)).toBe(1.5);
        expect(cb(_, _, 3, 4)(1, 2)).toBe(1.5);
        expect(cb(_, _, 3, 4)(_, 2)(1)).toBe(1.5);
        expect(cb(_, _, _, 4)(_, 2)(1, 3)).toBe(1.5);
        expect(cb(_, 2, _)(_, 3)(_, _)(_)(1, _)(4, _)(5)).toBe(1.5);
        expect(cb(_, _, _)(1, _, _)(_, _)(2, _)(_)(3, _)(4, 5)).toBe(1.5);

        // 校验参数
        expect(fn.mock.calls[0]).toEqual([1, 2, 3, 4]);
        expect(fn.mock.calls[1]).toEqual([1, 2, 3, 4]);
        expect(fn.mock.calls[2]).toEqual([1, 2, 3, 4]);
        expect(fn.mock.calls[3]).toEqual([1, 2, 3, 4]);
        expect(fn.mock.calls[4]).toEqual([1, 2, 3, 4]);
        expect(fn.mock.calls[5]).toEqual([1, 2, 3, 4, 5]);
        expect(fn.mock.calls[6]).toEqual([1, 2, 3, 4, 5]);
    });

    /* 测试柯里化上下文 */
    test('测试柯里化上下文', () => {
        let ctx = { x: 10 },
            cb = curry(function (a, b) {
                return a + this.x * b;
            });

        // 校验上下文
        expect(cb.call(ctx, 2, 4)).toBe(42);
        expect(cb.call(ctx, 2).call(ctx, 4)).toBe(42);
    });
});
