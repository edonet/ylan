/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-09 19:51:42
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import compose from '../lib/compose';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【compose】', () => {
    test('测试函数组合', () => {
        let fn1 = jest.fn((...args) => Math.max(...args)),
            fn2 = jest.fn(x => x * 2),
            cb = compose(fn2, fn1);

        // 校验结果
        expect(cb(1, 5, 2, 4)).toBe(10);
        expect(fn1.mock.calls).toEqual([[1, 5, 2, 4]]);
        expect(fn2.mock.calls).toEqual([[5]]);
    });
});
