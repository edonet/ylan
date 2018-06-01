/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-29 20:17:04
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const { format } = require('util');


/**
 *****************************************
 * 定义标准颜色
 *****************************************
 * 文本属性：00（默认值）、01（粗体）、22（非粗体）、04（下划线）、24（非下划线）、05（闪烁）、25（非闪烁）、07（反显）、27（非反显）
 * 文本颜色：30（黑色）、31（红色）、32（绿色）、 33（黄色）、34（蓝色）、35（洋红）、36（青色）、37（白色）
 * 背景颜色：40（黑色）、41（红色）、42（绿色）、 43（黄色）、44（蓝色）、45（洋红）、46（青色）、47（白色）
 */
const style = {
    bold: '\u001b[1m',
    yellow: '\u001b[1m\u001b[33m',
    red: '\u001b[1m\u001b[31m',
    green: '\u001b[1m\u001b[32m',
    cyan: '\u001b[1m\u001b[36m',
    magenta: '\u001b[1m\u001b[35m',
    default: '\u001b[39m\u001b[22m'
};


/**
 *****************************************
 * 使用颜色风格
 *****************************************
 */
function styled(color) {
    return function colored(...args) {
        return style[color] + format(...args) + style.default;
    };
}


/**
 *****************************************
 * 打印日志
 *****************************************
 */
function log(...args) {
    return console.log(...args);
}


/**
 *****************************************
 * 打印信息
 *****************************************
 */
function info(...args) {
    return console.log(module.exports.green(...args));
}


/**
 *****************************************
 * 打印警告
 *****************************************
 */
function warn(...args) {
    return console.warn(module.exports.yellow(...args));
}


/**
 *****************************************
 * 打印错误
 *****************************************
 */
function error(...args) {
    return console.error(module.exports.red(...args));
}

/**
 *****************************************
 * 打印块信息
 *****************************************
 */
function block(...args) {
    info('-'.repeat(80));
    args.forEach(message => info(message));
    info('-'.repeat(80));
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = {
    styled,
    bold: styled('bold'),
    yellow: styled('yellow'),
    red: styled('red'),
    green: styled('green'),
    cyan: styled('cyan'),
    magenta: styled('magenta'),
    log,
    info,
    warn,
    error,
    block
};
