/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-09 17:08:13
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import map from '../lib/map';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【map】', () => {
    test('测试遍历对象', () => {
        let cb = jest.fn(),
            apply = map(cb);

        // 校验非法参数
        expect(apply(null)).toBe(null);
        expect(apply(1)).toBe(1);
        expect(cb.mock.calls).toHaveLength(0);

        // 校验遍历字符串
        cb = jest.fn(str => str + '::');
        expect(map(cb)('abdc')).toEqual(['a::', 'b::', 'd::', 'c::']);
        expect(cb.mock.calls).toHaveLength(4);
        expect(cb.mock.calls[0]).toEqual(['a', 0]);
        expect(cb.mock.calls[2]).toEqual(['d', 2]);

        // 校验遍历数组
        cb = jest.fn(x => x + 2);
        expect(map(cb)([1, 2, 3])).toEqual([3, 4, 5]);
        expect(cb.mock.calls).toHaveLength(3);
        expect(cb.mock.calls[1]).toEqual([2, 1]);
        expect(cb.mock.calls[2]).toEqual([3, 2]);

        // 校验遍历对象
        cb = jest.fn((v, k) => [k, v + 2]);
        expect(map(cb)({ a: 1, b: 2 })).toEqual([['a', 3], ['b', 4]]);
        expect(cb.mock.calls).toHaveLength(2);
        expect(cb.mock.calls[0]).toEqual([1, 'a', 0]);
        expect(cb.mock.calls[1]).toEqual([2, 'b', 1]);

        // 校验【map】属性
        cb = jest.fn(x => x + 1);
        expect(map(cb)({ a: 1, map: fn => fn(2) })).toBe(3);
        expect(cb.mock.calls).toHaveLength(1);
        expect(cb.mock.calls[0]).toEqual([2]);
    });
});
