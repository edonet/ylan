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
    path = require('./path'),
    promisify = require('./promisify');


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
 * 抛出接口
 *****************************************
 */
module.exports = {
    stat,
    find,
    resolve,
    path: realpath,
    unlink: promisify(fs.unlink),
    symlink: promisify(fs.symlink),
    readdir: promisify(fs.readdir),
    readFile: promisify(fs.readFile),
    writeFile: promisify(fs.writeFile)
};
