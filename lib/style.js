/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-09 23:07:41
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载样式列表
 *****************************************
 */
export function use(locals = {}) {

    // 定义样式函数
    function styled(...args) {
        var map = {},
            list = [];


        // 获取列表
        classList(args, name => {
            if (name && !(name in map)) {
                map[name] = list.push(locals[name] || name);
            }
        });

        // 返回样式
        return list.join(' ');
    }

    // 定义扩展函数
    styled.use = data => use({ ...locals, ...data });

    // 返回样式函数
    return styled;
}

/**
 *****************************************
 * 创建样式列表
 *****************************************
 */
function classList(args, add) {
    args.forEach(argv => {
        if (argv) {
            var type = typeof argv;

            // 处理字符串
            if (type === 'string') {
                return argv.split(' ').forEach(add);
            }

            // 处理列表
            if (Array.isArray(argv)) {
                return classList(argv, add);
            }

            // 处理对象
            if (type === 'object') {
                return Object.keys(argv).forEach(key => argv[key] && add(key));
            }

            // 处理函数
            if (type === 'function') {
                return classList([argv()], add);
            }
        }
    });
}
