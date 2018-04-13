/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-02 15:44:44
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import observer from '../lib/observer';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【observer】', () => {

    /* 创建【observer】 */
    test('创建【observer】', () => {
        let ob = observer(),
            count = 0,
            cb = jest.fn(),
            unsubscribe,
            state;


        // 添加监听
        ob.subscribe(cb);

        // 添加监听
        unsubscribe = ob.subscribe(
            data => expect(data).toBe(state) || count ++
        );

        // 校验发布
        state = 1;
        ob.notify(state);

        // 校验回调
        expect(count).toBe(1);
        expect(cb.mock.calls).toHaveLength(1);
        expect(cb.mock.calls[0][0]).toBe(state);

        // 校验发布
        state = { value: 2 };
        ob.notify(state);

        // 校验回调
        expect(count).toBe(2);
        expect(cb.mock.calls).toHaveLength(2);
        expect(cb.mock.calls[1][0]).toBe(state);

        // 取消监听
        unsubscribe();

        // 校验发布
        state = null;
        ob.notify(state);

        // 校验回调
        expect(count).toBe(2);
        expect(cb.mock.calls).toHaveLength(3);
        expect(cb.mock.calls[2][0]).toBeNull();

        // 清空监听
        ob.clear();

        // 校验发布
        state = null;
        ob.notify(state);

        // 校验回调
        expect(count).toBe(2);
        expect(cb.mock.calls).toHaveLength(3);
        expect(cb.mock.calls[2][0]).toBeNull();
    });
});
