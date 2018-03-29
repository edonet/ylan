/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-29 23:16:43
 *****************************************
 */
'use strict';


/**
 *****************************************
 * promisify
 *****************************************
 */
function promisify(fn) {
    return function promised(...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (err, ...res) => err ? reject(err) : resolve(res.length > 1 ? res : res[0]));
        });
    };
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = promisify;
