/**
 *****************************************
 * Created by lifx
 * Created on 2018-06-01 20:47:33
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import cp from '../lib/cp';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【cp】模块', () => {

    /* 测试执行命令 */
    test('exec', async () => {
        expect(await cp.exec('echo exec', { silent: true })).toEqual(['exec']);
    });

    /* 测试执行命令 */
    test('spawn', async () => {
        expect(await cp.spawn('echo', ['spawn'], { silent: true })).toEqual(['spawn']);
    });
});
