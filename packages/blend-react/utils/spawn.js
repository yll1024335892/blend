/*
 * @Author: your name
 * @Date: 2020-05-15 19:06:06
 * @LastEditTime: 2020-08-21 16:00:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /health_web/scripts/libs/spawn.js
 */
const spinner = require('./spinner');

const spawn = async (cmd, options = {}) => {
    const chunks = cmd.split(' ');
    await new Promise((resolve, reject) => {
        const child = require('child_process').spawn(chunks.shift(), chunks, {
            stdio: 'inherit', //独立监听子进程日志
            shell: true,
            ...options,
        });
        child.on('close', () => {
            resolve();
        });
        child.on('error', (...args) => {
            reject(...args);
        });
    }).catch((e) => {
        spinner(cmd).fail();
        console.error(e);
    });
};

module.exports = spawn;
