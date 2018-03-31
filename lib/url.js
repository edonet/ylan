/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-31 23:55:01
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 创建【url】路径
 *****************************************
 */
module.exports = function url({ protocol, host, port }) {
    return {
        get href() {
            return `${ protocol }://${ host }:${ port }/`;
        }
    };
};
