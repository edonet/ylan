/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-29 15:00:45
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    fs = require('fs'),
    glob = require('glob'),
    path = require('./path'),
    promisify = require('./promisify'),
    model = Object.create(fs),
    local = {
        mkdir: promisify(fs.mkdir),
        rmdir: promisify(fs.rmdir),
        readdir: promisify(fs.readdir),
        unlink: promisify(fs.unlink),
        symlink: promisify(fs.symlink),
        readFile: promisify(fs.readFile),
        writeFile: promisify(fs.writeFile)
    };


/**
 *****************************************
 * 加载并解析模块
 *****************************************
 */
function resolve(dir, model = null) {
    try {
        return require(path.cwd(dir));
    } catch (err) {
        // do nothing;
    }

    // 返回默认
    return model;
}


/**
 *****************************************
 * 获取文件信息
 *****************************************
 */
function stat(dir) {
    return new Promise(resolve => {
        fs.lstat(dir, (err, stats) => resolve(err ? null : stats));
    });
}


/**
 *****************************************
 * 查找文件
 *****************************************
 */
async function find(...args) {

    // 查找文件
    for (let name of args) {
        let dir = path.cwd(name),
            stats = await stat(dir);

        // 查找成功
        if (stats) {
            return Object.create(stats, { path: { get() { return dir; } } });
        }
    }

    // 返回空
    return null;
}


/**
 *****************************************
 * 移除文件夹
 *****************************************
 */
async function rmdir(dir) {
    let stats = await stat(dir);

    // 判断文件存在
    if (stats) {

        // 处理文件夹
        if (stats.isDirectory()) {
            let files = await local.readdir(dir);

            // 依次移除子文件
            await Promise.all(
                files.map(file => rmdir(path.resolve(dir, file)))
            );

            // 移除空目录
            return await local.rmdir(dir);
        }

        // 移除文件
        await local.unlink(dir);
    }
}


/**
 *****************************************
 * 读取文件
 *****************************************
 */
async function readFile(dir, options) {
    return local.readFile(dir, { encoding: 'utf8', ...options });
}


/**
 *****************************************
 * 获取文件路径
 *****************************************
 */
function realpath(dir) {
    return new Promise((resolve, reject) => {
        fs.realpath(dir, (err, path) => err ? reject(err) : resolve(path || dir));
    });
}


/**
 *****************************************
 * 复制文件
 *****************************************
 */
function copyFile(src, dist) {
    return new Promise((resolve, reject) => {
        let rs = fs.createReadStream(path.cwd(src)),
            ws = fs.createWriteStream(path.cwd(dist));

        // 监听事件
        rs.on('error', reject);
        ws.on('error', reject);
        ws.on('close', resolve);

        // 传输文件
        rs.pipe(ws);
    });
}


/**
 *****************************************
 * 复制目录
 *****************************************
 */
async function copy(src, dist) {
    let stats = await stat(src),
        files;

    // 处理文件
    if (!stats.isDirectory()) {
        return await copyFile(src, dist);
    }

    // 生成目标路径
    if (!await stat(dist)) {
        await local.mkdir(dist);
    }

    // 读取文件夹
    files = await local.readdir(src);

    // 处理文件
    await Promise.all(files.map(file => (
        file === 'node_modules' ? Promise.resolve() : copy(path.resolve(src, file), path.resolve(dist, file))
    )));
}


/**
 *****************************************
 * 搜索文件
 *****************************************
 */
function search(patt, options = {}) {
    return new Promise((resolve, reject) => glob(
        patt, options, (err, files) => err ? reject(err) : resolve(files)
    ));
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = Object.assign(model, {
    ...local,
    resolve,
    stat,
    find,
    rmdir,
    readFile,
    copyFile,
    copy,
    path: realpath,
    search
});
