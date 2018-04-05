/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-04 22:40:04
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import { use } from '../lib/style';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【style】', () => {

    /* 测试【use】 */
    test('测试【use】', () => {
        let style = use({ test: 'test-class' });

        // 校验结果
        expect(style('abs', null, 'box', 1, 'test')).toBe('abs box test-class');
        expect(style(['abs', 'box'], 'c1', () => 'c2')).toBe('abs box c1 c2');
        expect(style('abs', { test: true, c1: '', c2: 1 })).toBe('abs test-class c2');
        expect(style(() => 'test', () => ({ c1: false, c2: 1 }))).toBe('test-class c2');
        expect(style('abs', 'box', { abs: true, box: false }, 'c1', 'c1 c2')).toBe('abs box c1 c2');

        // 添加对象
        style = style.use({ abs: 'abs-class', box: 'box-class' });

        // 校验结果
        expect(style('abs', null, 'box', 1, 'test')).toBe('abs-class box-class test-class');
        expect(style(['abs', 'box'], 'c1', () => 'c2')).toBe('abs-class box-class c1 c2');
        expect(style('abs', { test: true, c1: '', c2: 1 })).toBe('abs-class test-class c2');
        expect(style(() => 'test', () => ({ c1: false, c2: 1 }))).toBe('test-class c2');
        expect(style('abs', 'box', { abs: true, box: false }, 'c1', 'c1 c2')).toBe('abs-class box-class c1 c2');
    });
});
