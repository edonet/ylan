/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-30 22:54:53
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import fs from '../lib/fs';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【fs】', () => {

    /* 获取文件状态 */
    test('获取文件状态', async () => {
        let name = './a.temp',
            stats = await fs.stat(name);

        // 校验文件不存在
        expect(stats).toBeNull();

        // 创建文件
        await fs.writeFile(name, 'test');

        // 获取状态
        stats = await fs.stat(name);

        // 校验文件存在
        expect(stats).not.toBeNull();

        // 清除文件
        await fs.unlink(name);
    });
});
