#!/usr/bin/env node
/*
 * @Description: 使用密钥的方式部署前端代码到服务器
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2021-06-05 14:44:12
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2021-06-05 18:22:55
 */
const shell = require('shelljs')
const path = require('path')
const fs = require('fs')
const Client = require('ssh2-sftp-client')
const config = require('./config')

// 当前运行环境变量与运行命令
const NODE_ENV = process.env.NODE_ENV

const PRESET_PATH = path.resolve(__dirname, './')
const PACKAGE = path.resolve(PRESET_PATH, '../package.json')
if (!config[NODE_ENV].webDir) {
  shell.echo('未发现【服务器部署路径】，请检查配置！')
  shell.exit()
}
const privateKey = path.resolve(PRESET_PATH, config[NODE_ENV].privateKey)
const distPath = path.resolve(PRESET_PATH, config[NODE_ENV].distPath)

let PACKAGE_JSON = null
try {
  PACKAGE_JSON = JSON.parse(fs.readFileSync(PACKAGE).toString())
} catch (error) {
  shell.echo('没有找到 package.json 文件，请检查文件或路径')
  shell.exit()
}

config[NODE_ENV].privateKey = privateKey ? fs.readFileSync(privateKey) : ''
config[NODE_ENV].script = PACKAGE_JSON.scripts[config[NODE_ENV].script]
if (!config[NODE_ENV].script) {
  shell.echo('没有找到打包命令，请检查配置')
  shell.exit()
}

/**
 * @author: yiling (315800015@qq.com)
 * @description: 执行打包命令
 * @param {*}
 * @return {*}
 * @Date: 2021-05-28 17:43:03
 */
async function compileDist() {
  console.log('开始打包项目', Date.now())
  if (shell.exec(config[NODE_ENV].script).code === 0) {
    console.log('打包成功', Date.now())
  }
}

/**
 * @author: yiling (315800015@qq.com)
 * @description: 连接ssh
 * @param {*}
 * @return {*}
 * @Date: 2021-05-28 11:10:53
 */
const sftp = new Client()
const connectSSh = async () => {
  let startTime = null
  sftp
    .connect(config[NODE_ENV])
    .then(() => {
      console.log('-连接服务器成功', Date.now())
      if (config[NODE_ENV].isRemoveRemoteFile) {
        return deleteWebDir()
      }
    })
    .then(() => {
      // 上传文件
      startTime = Date.now()
      console.log('-------开始上传', startTime)
      return sftp.uploadDir(distPath, config[NODE_ENV].webDir)
    })
    .then((data) => {
      console.log('---上传完成耗时', Date.now() - startTime, 'ms')
      sftp.end()
    })
    .catch((err) => {
      console.log(err, '连接失败', Date.now())
      sftp.end()
    })
}
/**
 * @author: yiling (315800015@qq.com)
 * @description: 删除远程目录
 * @param {*}
 * @return {*}
 * @Date: 2021-05-28 16:20:14
 */
const deleteWebDir = () => {
  return findWebDir(config[NODE_ENV].webDir).then((res) => {
    if (res) {
      return sftp.rmdir(config[NODE_ENV].webDir, true)
    }
  })
}
/**
 * @author: yiling (315800015@qq.com)
 * @description: 查看远程目录是否存在
 * @param {String} path 远程路径
 * @return {*}
 * @Date: 2021-05-28 16:47:41
 */
const findWebDir = (path) => {
  return new Promise((resolve) => {
    return sftp
      .exists(path)
      .then((res) => {
        return resolve(res)
      })
      .catch((err) => {
        console.log('远程目录出现错误', err)
      })
  })
}

async function runTask() {
  await compileDist() // 打包完成
  await connectSSh() // 提交上传
}
runTask()
