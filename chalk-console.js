#!/usr/bin/env node
/*
 * @Description: 让命令行实现彩色
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2021-09-21 19:54:32
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2021-09-21 20:01:39
 * @FilePath: \chalk-console\chalk-console.js
 */
const chalk = require('chalk') // 引入颜色插件
chalk.level = 1 // 不设置的话不会变色

console.log(
  '节后必跌仿佛已经成了' +
    chalk.redBright('铁律') +
    '，但我还是希望明天的' +
    chalk.red('基金') +
    '不要再' +
    chalk.greenBright('绿') +
    '下去，' +
    chalk.yellow('好吗？')
)