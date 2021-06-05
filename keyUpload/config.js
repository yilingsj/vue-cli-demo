#!/usr/bin/env node
/*
 * @Description: 一键部署代码到服务器上的配置
 * @Author: yiling (315800015@qq.com)
 * @Date: 2021-05-27 21:13:59
 * @LastEditors: yiling (315800015@qq.com)
 * @LastEditTime: 2021-05-28 17:46:55
 * @FilePath: \v5_element\keyUpload\config.js
 */
const commonBase = {
  host: '*.*.*.*', // 服务器地址
  port: 22, // 服务器端口号
  username: 'root', // 服务器登录用户名
  password: '', // 服务器登录密码
  privateKey: './xxx.pem', // 密钥地址，与密码二选一均可
  isRemoveRemoteFile: false, // 是否删除远程文件（默认false）
}
const config = {
  name: '前端一键部署脚本',
  test: {
    name: '测试环境', // 环境名称
    distPath: '../dist/test', // 本地打包生成目录
    webDir: '/root/www/test', // 服务器部署路径（不可为空或'/'）
    script: 'build:test', // 打包命令
    ...commonBase,
  },
  pre: {
    name: '预上线环境',
    distPath: '../dist/pre',
    webDir: '/root/www/pre',
    script: 'build:pre',
    ...commonBase,
  },
  prod: {
    name: '正式环境',
    distPath: '../dist/prod',
    webDir: '/root/www/prod',
    script: 'build:prod',
    ...commonBase,
  },
}

module.exports = config
