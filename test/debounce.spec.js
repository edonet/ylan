/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-09 21:45:45
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import debounce from '../lib/debounce';


/**
 *****************************************
 * 模拟时间函数
 *****************************************
 */
jest.useFakeTimers();


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【debounce】', () => {
    test('测试函数去抖', () => {
        let cb = jest.fn(),
            debounced = debounce(cb);

        // 调用函数
        debounced(1);
        debounced(2);
        debounced(3);

        // 执行时间函数
        jest.runAllTimers();

        // 校验结果
        expect(cb.mock.calls).toHaveLength(1);
        expect(cb.mock.calls[0]).toEqual([3]);

        // 更新设置
        debounced = debounce(cb, 1000, { leading: true });

        // 调用函数
        debounced(1);
        debounced(2);
        debounced(3);

        // 执行时间函数
        jest.runAllTimers();

        // 校验结果
        expect(cb.mock.calls).toHaveLength(2);
        expect(cb.mock.calls[1]).toEqual([1]);

        // 校验时间函数
        expect(setTimeout).toHaveBeenCalledTimes(6);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
        expect(clearTimeout).toHaveBeenCalledTimes(4);
    });
});
