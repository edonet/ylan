/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-29 15:12:46
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    os = require('os'),
    path = require('path'),
    cwd = process.cwd(),
    homedir = os.homedir(),
    model = Object.create(path);


/**
 *****************************************
 * 使用目录作为基础目录
 *****************************************
 */
function usedir(root) {
    return function dir(...args) {
        return path.resolve(root, ...args);
    };
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = Object.assign(model, {
    cwd: usedir(cwd),
    homedir: usedir(homedir),
    resolve: path.resolve,
    usedir
});
