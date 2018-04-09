/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-09 20:11:05
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import * as url from '../lib/url';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【url】', () => {

    /* 校验拼接参数 */
    test('校验拼接参数', () => {
        expect(url.path('/a/b/c', { a: 1, b: 2, c: 3 })).toBe('/a/b/c?a=1&b=2&c=3');
        expect(url.path('/a/b/c?d=4', { a: 1, b: 2, c: 3 })).toBe('/a/b/c?d=4&a=1&b=2&c=3');
        expect(url.path('/a/b/c?d=4#hash', { a: 1, b: 2, c: 3 })).toBe('/a/b/c?d=4&a=1&b=2&c=3#hash');
        expect(url.path('/a/b/c#hash?d=4', { a: 1, b: 2, c: 3 })).toBe('/a/b/c?a=1&b=2&c=3#hash?d=4');
    });

    /* 获取路径参数 */
    test('获取路径参数', () => {
        expect(url.query()).toEqual({});
        expect(url.query('')).toEqual({});
        expect(url.query('/a/b/c')).toEqual({});
        expect(url.query('/a/b/c?d=4')).toEqual({ d: 4 });
        expect(url.query('/a/b/c?d=4&a=1&b[]=2&b[]=3')).toEqual({ a: 1, b: [2, 3], d: 4 });
        expect(url.query('/a/b/c?a=1&b=2&c=3#d=4')).toEqual({ a: 1, b: 2, c: 3 });
        expect(url.query('/a/b/c#d=4?a=1&b=2&c=3')).toEqual({});
    });
});
