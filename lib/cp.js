/**
 *****************************************
 * Created by lifx
 * Created on 2018-06-01 20:32:48
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    cp = require('child_process'),
    stdout = require('./stdout');


/**
 *****************************************
 * 执行子命令
 *****************************************
 */
function exec(command, options) {
    return ((args) => spawn(args.shift(), args, options))(command.split(' '));
}


/**
 *****************************************
 * 启动子命令
 *****************************************
 */
function spawn(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        if (command) {
            let { silent, onStdout, onStderr, ...rest } = options,
                result = [],
                error = [],
                sp;


            // 启动子任务
            sp = cp.spawn(command, args, {
                shell: process.platform === 'win32',
                ...rest
            });

            // 监听标准输出
            if (sp.stdout) {
                sp.stdout.on('data', data => {
                    let str = data.toString().trim();

                    // 处理输出
                    silent || stdout.info(str);
                    onStdout && onStdout(str);
                    result.push(str.trim());
                });
            }

            // 监听错误输出
            if (sp.stderr) {
                sp.stderr.on('data', data => {
                    let str = data.toString().trim();

                    // 处理输出
                    silent || stdout.error(str);
                    onStderr && onStderr(str);
                    error.push(str);
                });
            }

            // 结果进程
            sp.on('close', code => code ? reject(error) : resolve(result));

            // 启动失败
            sp.on('error', reject);

            // 返回
            return;
        }

        // 结果
        resolve();
    });
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = { exec, spawn };
