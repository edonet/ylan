/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-09 16:31:53
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import each from '../lib/each';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【each】', () => {
    test('遍历对象', () => {
        let cb = jest.fn(),
            apply = each(cb);

        // 校验非法参数
        apply(null);
        apply(1);
        expect(cb.mock.calls).toHaveLength(0);

        // 校验遍历字符串
        apply('abdc');
        expect(cb.mock.calls).toHaveLength(4);
        expect(cb.mock.calls[0]).toEqual(['a', 0]);
        expect(cb.mock.calls[2]).toEqual(['d', 2]);

        // 校验遍历数组
        apply([1, 2, 3]);
        expect(cb.mock.calls).toHaveLength(7);
        expect(cb.mock.calls[5]).toEqual([2, 1]);
        expect(cb.mock.calls[6]).toEqual([3, 2]);

        // 校验遍历对象
        apply({ a: 1, b: 2 });
        expect(cb.mock.calls).toHaveLength(9);
        expect(cb.mock.calls[7]).toEqual([1, 'a', 0]);
        expect(cb.mock.calls[8]).toEqual([2, 'b', 1]);
    });
});
