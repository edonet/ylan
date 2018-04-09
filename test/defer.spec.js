/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-19 17:41:33
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import defer from '../lib/defer';


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
describe('测试【defer】', () => {
    test('测试延时', async () => {
        let count = 1,
            deferred = defer();

        // 校验结果
        expect(count ++).toBe(1);

        // 延时
        setTimeout(() => deferred.resolve(count), 1000);

        // 校验结果
        expect(count ++).toBe(2);

        // 执行时间函数
        jest.runAllTimers();

        // 返回延时对象
        expect(await deferred.promise).toBe(3);
    });
});
