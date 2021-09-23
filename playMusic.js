#!/usr/bin/env node
/*
 * @Description: 播放本地音乐
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2021-09-21 20:52:43
 * @LastEditors: yilingsj（315800015@qq.com）
 * @LastEditTime: 2021-09-21 21:32:22
 * @FilePath: \playMusic\playMusic.js
 */
const open = require("open")
const fs = require("fs")
const path = require("path")

// 本地音乐地址，windows下注意双斜线
const dir = "D:\\work2020\\playMusic\\music"
/**
 * @author: yiling (315800015@qq.com)
 * @description: 读取文件夹下所有的文件
 * @param {String} dir 路径
 * @param {Array} filesList 存储的数组
 * @return {*}
 * @Date: 2021-09-18 13:55:54
 */
async function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir)
  console.log("文件名：", files)
  files.forEach((item, index) => {
    let fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item), filesList) // 递归读取文件
    } else {
      filesList.push(fullPath)
    }
  })
  return filesList
}
/**
 * @author: yiling (315800015@qq.com)
 * @description: 取两个数之间的随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return {*}
 * @Date: 2021-09-18 14:05:34
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
/**
 * @author: yiling (315800015@qq.com)
 * @description: 获取音乐
 * @param {String} dir 本地音乐目录
 * @return {*}
 * @Date: 2021-09-18 14:12:16
 */
async function getMusic(dir) {
  const musicList = await readFileList(dir)
  const index = getRandomNumber(0, musicList.length)
  const src = musicList[index]
  const name = src.substr(src.lastIndexOf("\\")).replace("\\", "")
  console.log("当前播放的铃声是：", name)
  return src
}
/**
 * @author: yiling (315800015@qq.com)
 * @description: 播放音乐
 * @param {String} dir 本地音乐目录
 * @return {*}
 * @Date: 2021-09-18 14:13:13
 */
async function playMusic(dir) {
  const src = await getMusic(dir)
  await open(src)
}

playMusic(dir)
