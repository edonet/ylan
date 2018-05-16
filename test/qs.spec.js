/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-09 11:10:31
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import { stringify, parse, encode, decode } from '../lib/qs';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【qs】', () => {

    /* 序列化参数 */
    test('序列化参数', () => {
        let params = {};

        // 校验无效参数
        expect(stringify()).toBe('');
        expect(stringify(null)).toBe('');
        expect(stringify({})).toBe('');

        // 校验对象
        params = { a: 'a', b: 2, c: true, d: false, e: () => {} };
        expect(stringify(params)).toBe('a=a&b=2&c=true&d=false');

        // 校验中文
        params = { name: '慕白', age: 24 };
        expect(stringify(params)).toBe('name=%E6%85%95%E7%99%BD&age=24');

        // 校验数组
        params = [1, 2, { name: 'white', sex: ['man', 'women'] }];
        expect(stringify(params)).toBe('0=1&1=2&2[name]=white&2[sex][0]=man&2[sex][1]=women');
        params = { name: 'white', sex: ['man', 'women'] };
        expect(stringify(params)).toBe('name=white&sex[0]=man&sex[1]=women');
        params = { status: 1, data: { name: 'white', sex: ['man', 'women'] } };
        expect(stringify(params)).toBe('status=1&data[name]=white&data[sex][0]=man&data[sex][1]=women');

        // 校验对象
        params = { name: 'white', sex: { man: 1, women: 2 } };
        expect(stringify(params)).toBe('name=white&sex[man]=1&sex[women]=2');
        params = { list: [{ name: 'white', sex: { man: 1, women: 2 } }, 1, 2, { a: 'a' }, [1, 2]] };
        expect(stringify(params)).toBe('list[0][name]=white&list[0][sex][man]=1&list[0][sex][women]=2&list[1]=1&list[2]=2&list[3][a]=a&list[4][0]=1&list[4][1]=2');

        // 校验连接符
        params = { name: 'white', sex: ['man', 'women'] };
        expect(stringify(params, '|', '&')).toBe('name&white|sex[0]&man|sex[1]&women');
    });


    /* 解析参数 */
    test('解析参数', () => {
        let query = {};

        // 校验无效参数
        expect(parse()).toEqual({});
        expect(parse(null)).toEqual({});
        expect(parse({})).toEqual({});
        expect(parse('')).toEqual({});

        // 校验对象
        query = 'a=a&b=2&c=true&d=false';
        expect(parse(query)).toEqual({ a: 'a', b: 2, c: true, d: false });

        // 校验中文
        query = 'name=%E6%85%95%E7%99%BD&age=24';
        expect(parse(query)).toEqual({ name: '慕白', age: 24 });

        // 校验数组
        query = '0=1&1=2&2[name]=white&2[sex][0]=man&2[sex][1]=women';
        expect(parse(query)).toEqual([1, 2, { name: 'white', sex: ['man', 'women'] }]);
        query = 'name=white&sex[0]=man&sex[1]=women';
        expect(parse(query)).toEqual({ name: 'white', sex: ['man', 'women'] });
        query = 'status=1&data[name]=white&data[sex][0]=man&data[sex][1]=women';
        expect(parse(query)).toEqual({ status: 1, data: { name: 'white', sex: ['man', 'women'] } });

        // 校验对象
        query = 'name=white&sex[man]=1&sex[women]=2';
        expect(parse(query)).toEqual({ name: 'white', sex: { man: 1, women: 2 } });
        query = 'list[0][name]=white&list[0][sex][man]=1&list[0][sex][women]=2&list[1]=1&list[2]=2&list[3][a]=a&list[4][0]=1&list[4][1]=2';
        expect(parse(query)).toEqual({ list: [{ name: 'white', sex: { man: 1, women: 2 } }, 1, 2, { a: 'a' }, [1, 2]] });

        // 校验连接符
        query = 'name&white|sex[0]&man|sex[1]&women';
        expect(parse(query, '|', '&')).toEqual({ name: 'white', sex: ['man', 'women'] });
    });

    /* 转码、解码查询字符串 */
    test('转码、解码查询字符串', () => {
        expect(encode('name=慕白&age=24')).toBe('name=%E6%85%95%E7%99%BD&age=24');
        expect(decode('name=%E6%85%95%E7%99%BD&age=24')).toBe('name=慕白&age=24');
    });
});
