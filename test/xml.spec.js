/**
 *****************************************
 * Created by lifx
 * Created on 2018-05-31 16:03:10
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import fs from '../lib/fs';
import xml from '../lib/xml';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【xml】模块', () => {
    let data = {
            widget: {
                $: { id: 'com.edonet.ylan' },
                name: ['xml'],
                engine: [
                    { $: { name: 'ios' }, _: 'ios' },
                    { $: { name: 'android' }, _: 'android' }
                ]
            }
        };


    // 解析对象
    test('解析对象', async () => {
        let str = xml.stringify(data);

        // 校验解析
        expect(str.indexOf('<engine name="ios"') > -1).toBeTruthy();
        expect(await xml.parse(str)).toEqual(data);
    });

    // 解析文件
    test('解析文件', async () => {

        // 创建临时文件
        await xml.writeFile('./tmp.xml', data);

        // 校验文件
        expect(await xml.readFile('./tmp.xml')).toEqual(data);

        // 移除临时文件
        await fs.unlink('./tmp.xml');
    });
});
