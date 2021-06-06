# 原文地址：
	http://www.yilingsj.com/xwzj/2021-06-05/vue-cli-keyUpload.html

# github仓库：
	https://github.com/yilingsj/vue-cli-demo/tree/dev-vue-cli-keyUpload-20210605

## 功能
只需在控制台中输入 npm run upload:test 并回车，即可实现项目打包并自动上传到服务器，省去人工手动上传的步骤，提高开发效率。该demo支持密钥和密码两种不同的方式登录服务器，看官可根据实际情况进行选择。效果如下图：
![在命令行窗口中输入代码实现自动打包及上传.png](https://img.alicdn.com/imgextra/i3/759415648/O1CN01b7EZkQ1rapf9gig5P_!!759415648.png)

## 视频演示
[使用密钥连接服务器并成功上传文件.mp4](https://cloud.video.taobao.com//play/u/759415648/p/1/e/6/t/1/312576788141.mp4)

## 如何使用：
1、修改keyUpload/config.js文件，按照里面的提示修改ip、端口号、用户名、密码或密钥的地址、设置本地打包后的路径及服务器路径，配置比较多，建议看官仔细应对。

2、进入项目根目录下，在命令行中执行下方代码

	npm install shelljs ssh2-sftp-client cross-env --save-dev

3、主要打包命令见package.json中的scripts，请根据实际情况进行选择修改到自己的项目中。下面介绍下各打包命令的用途。

	npm run dev // 本地开发环境
	npm run build:test // 打包测试环境
	npm run build:pre // 打包预上线环境
	npm run build:prod // 打包正式环境
	npm run upload:test // 打包测试环境并自动上传到服务器
	npm run upload:pre // 打包预上线环境并自动上传到服务器
	npm run upload:prod // 打包正式环境并自动上传到服务器

4、在命令行中执行 npm run upload:test并回车，稍等片刻当控制台中出现“**---上传完成耗时**”，表示上传成功。
