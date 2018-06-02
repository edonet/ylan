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
import path from '../lib/path';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【fs】', () => {
    let dir = path.resolve(__dirname, './a'),
        file = path.resolve(dir, 'temp.file'),
        symlink = path.resolve(dir, 'temp.link');


    /* 创建目录 */
    test('创建目录', async () => {

        // 校验目录不存在
        expect(await fs.stat(dir)).toBeNull();

        // 创建目录
        await fs.mkdir(dir);

        // 校验目录存在
        expect((await fs.stat(dir)).isDirectory()).toBeTruthy();
    });


    /* 创建文件 */
    test('创建文件', async () => {

        // 写入文件
        await fs.writeFile(file, 'test');

        // 校验存在
        expect((await fs.stat(file)).isFile()).toBeTruthy();

        // 校验文件内容
        expect(await fs.readFile(file)).toBe('test');

        // 再次写入文件
        await fs.writeFile(file, 'test');

        // 校验文件内容
        expect(await fs.readFile(file)).toBe('test');

        // 移除文件
        await fs.unlink(file);

        // 校验不存在
        expect(await fs.stat(file)).toBeNull();
    });


    /* 创建软链接 */
    test('创建软链接', async () => {

        // 写入文件
        await fs.writeFile(file, 'file');

        // 校验文件内容
        expect(await fs.readFile(file)).toBe('file');

        // 创建软链接
        await fs.symlink(file, symlink);

        // 校验文件内容
        expect(await fs.readFile(symlink)).toBe('file');

        // 写入软链接
        await fs.writeFile(symlink, 'symlink');

        // 校验文件内容
        expect(await fs.readFile(file)).toBe('symlink');

        // 移除文件
        await fs.unlink(file);
        await fs.unlink(symlink);

        // 校验不存在
        expect(await fs.stat(file)).toBeNull();
        expect(await fs.stat(symlink)).toBeNull();
    });


    /* 删除目录 */
    test('删除目录', async () => {

        // 创建文件
        await fs.writeFile(file, 'test');

        // 校验目录存在
        expect((await fs.stat(dir)).isDirectory()).toBeTruthy();

        // 创建目录
        await fs.rmdir(dir);

        // 校验目录不存在
        expect(await fs.stat(dir)).toBeNull();
    });

    /* 复制目录 */
    test('复制目录', async () => {

        // 创建临时文件
        await fs.mkdir('tmp');
        await Promise.all([
            fs.writeFile('tmp/a.txt', 'a'),
            fs.writeFile('tmp/b.txt', 'b'),
            fs.writeFile('tmp/c.txt', 'c'),
            fs.mkdir('tmp/node_modules')
        ]);

        // 复制文件
        await fs.copy('tmp', 'tmp2');

        // 获取状态
        let [stats, ...res] = await Promise.all([
                fs.stat('tmp/node_modules'),
                fs.readFile('tmp2/a.txt'),
                fs.readFile('tmp2/b.txt'),
                fs.readFile('tmp2/c.txt'),
                fs.stat('tmp2/node_modules')
            ]);

        // 校验结果
        expect(stats).toBeTruthy();
        expect(res).toEqual(['a', 'b', 'c', null]);

        // 移除临时文件
        await fs.rmdir('tmp');
        await fs.rmdir('tmp2');
    });

    /* 搜索文件 */
    test('搜索文件', async () => {

        // 创建临时文件
        await fs.mkdir('tmp');
        await fs.mkdir('tmp/b');
        await Promise.all([
            fs.writeFile('tmp/a.txt', 'a'),
            fs.writeFile('tmp/b/b.txt', 'b'),
            fs.writeFile('tmp/c.txt', 'c')
        ]);

        // 校验搜索结果
        expect(await fs.search('tmp/*.txt')).toEqual(['tmp/a.txt', 'tmp/c.txt']);
        expect(await fs.search('tmp/**/*.txt')).toEqual(['tmp/a.txt', 'tmp/b/b.txt', 'tmp/c.txt']);

        // 移除临时文件
        await fs.rmdir('tmp');
    });
});
