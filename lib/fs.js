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
    promisify = require('./promisify');


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
 * 获取文件路径
 *****************************************
 */
function path(dir) {
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
    stat, path,
    unlink: promisify(fs.unlink),
    symlink: promisify(fs.symlink)
};
