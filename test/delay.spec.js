/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-09 22:09:10
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import delay from '../lib/delay';


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
describe('测试【delay】', () => {
    test('测试延时执行', () => {
        let cb = jest.fn();

        // 处理延时
        delay(1000);
        delay(() => cb(0));
        delay(() => cb(200), 200);
        delay(100, () => cb(100));

        // 执行时间函数
        jest.runAllTimers();

        // 校验执行结果
        expect(cb.mock.calls).toHaveLength(3);
        expect(cb.mock.calls[0]).toEqual([0]);
        expect(cb.mock.calls[1]).toEqual([100]);
        expect(cb.mock.calls[2]).toEqual([200]);

        // 校验时间函数
        expect(setTimeout).toHaveBeenCalledTimes(4);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
    });
});
