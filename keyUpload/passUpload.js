#!/usr/bin/env node
/*
 * @Description: 使用密码的方式部署前端代码到服务器
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2021-06-05 14:44:12
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2021-06-05 18:23:20
 */
const Client = require('ssh2-sftp-client')
const sftp = new Client()

sftp
  .connect({
    host: 'ip地址', // 服务器地址，修改成自己的
    port: '22', // 端口号，修改成自己的
    username: '用户名', // 服务器登录用户名，修改成自己的
    password: '密码', // 密码，修改成自己的
  })
  .then(() => {
    console.log('-使用密码的方式连接服务器成功', Date.now())
  })
  .then((data) => {
    console.log(data, 'the data info')
    sftp.end()
  })
  .catch((err) => {
    console.log(err, 'catch error')
    sftp.end()
  })
