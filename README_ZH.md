<h1 align="center">ChatGPT-wechat-bot🤖</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>


> 几步即可获得一个基于 ChatGPT 的微信机器人 🤖。
> [English](README.md) | 中文文档

## Support

- [x] 支持上下文语境的对话。
- [x] 支持重置上下文语境，通过关键词(reset)重置对话上下文语境。
- [x] 支持在群聊@你的机器人 🤖，@机器人即可收到回复。
- [x] 支持通过关键词唤醒你的机器人，如当在群组中发送“@机器人 hello xxxx”时才会收到回复。
- [x] 支持 Docker 运行。
- [x] 支持设置重试次数，当请求 ChatGPT 错误时，会自动重试。
- [ ] 捕获错误并重试。
- [ ] 其他

## 默认配置

```
{
  // 填入你的session token
  chatGPTSessionToken: '',
  // 设置获取消息的重试次数
  retryTimes: 3,
  // 在群组中设置唤醒微信机器人的关键词
  groupKey: '',
  // 在私聊中设置唤醒微信机器人的关键词
  privateKey: '',
  // 重置上下文的关键词，如可设置为reset
  resetKey: 'reset',
  // 开启会后收到ChatGPT的自动回复
  autoReply: true,
  // 根据正则匹配是否自动通过好友验证
  friendShipRule: /chatgpt|chat/,
}
```



## 用原dockerfile文件引导Docker 运行

```
// build
docker build --pull --rm -f "Dockerfile" -t wechatbot:latest "."


// run, and then you will see some logs
docker run --name wechatbot wechatbot:latest

```



## 部署好的Docker镜像

```
docker pull telepuryang/packbot
```

#### 运行

**进入镜像目录，再到/code目录下**

进入主目录：

```
docker exec -it [containersID] /bin/bash
```

如果你找不到code文件夹，请cd回退上一层后再cd到code/文件夹后

执行：

```
npm run build
```

后

```
node lib/bundle.esm.js
```





## 自己创建镜像，Dockerfile文件的配置

> **注意：**由于原dockerfile文件中，存在获取linux_signing_key.pub文件的步骤。**部分无科学上网环境**的设备可能会在”setting up wget“后一直停滞。需要手动解决。



#### 查看是否停止在下载状态

单独执行

```
wget -O - https://dl-ssl.google.com/linux/linux_signing_key.pub
```







#### 用项目中的dockerfile文件build镜像时，不会一次性正常运行，只能满足创建好镜像的基本操作。

- 镜像系统**默认使用ubuntu**，如果你需要更换，请**修改FROM**，也别忘记**修改**dockerfile文件中的对应的**包管理代码**。

  如：centos用yum，Ubuntu用apt-get等。







#### 用dockerfile文件引导，创建好镜像后，你需要执行以下操作方可确保正常运行：

1. 安装wget软件包

   ```shell
   apt-get install -y wget
   ```

2. 下载chrome的linux_signing_key.pub文件

   地址：https://dl-ssl.google.com/linux/linux_signing_key.pub

   

   下载好后在文件所在目录执行：显示ok表示成功

   ```shell
   cat linux_signing_key.pub |  apt-key add -
   ```

3. 下载chrome

   ```shell
   apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
     --no-install-recommend
   ```

   

4. 清除不必要文件

   ```shell
   rm -rf /var/lib/apt/lists/*
   ```







### 运行

**在docker中进入镜像目录，再到/code目录下**

进入主目录：

```
docker exec -it [containersID] /bin/bash
```

如果你找不到code文件夹，请cd回退上一层后再cd到code/文件夹后

执行：

```
npm run build
```

后

```
node lib/bundle.esm.js
```



#### 至此你的终端界面中应该出现了微信登录二维码。

![image-20221212001540039](/Users/yangyichen/Library/Application Support/typora-user-images/image-20221212001540039.png)



#### token的添加请往下。



在docker中，你只需要添加好token以后再重复：

执行：

```
npm run build
```

后

```
node lib/bundle.esm.js
```

即可。



#### 你可能需要vim编辑器来帮助你编辑文本,

```
apt-get install vim
```



进入容器主目录的src下文件夹可对config文件进行配置修改。填写token

> 注意：vim打开可能会出现中文乱码情况。







## 开始设置机器人 🤖

1. 首先，需要按照以下步骤获你的 ChatGPT 的 session token.

> 获取你的 session token:
>
> - 打开 [https://chat.openai.com/chat](https://chat.openai.com/chat) 并登录注册，进入网页。
> - 打开浏览器的 dev tools（按 F12）.
> - 从顶栏中选择 Application > Cookies.
>   ![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1670287051371-acd694da-cd3f-46c4-97c4-96438965f8a4.png#averageHue=%232d3136&clientId=uf4023d0a-0da7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=497&id=u77b3570c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=994&originWidth=1586&originalType=binary&ratio=1&rotation=0&showTitle=false&size=796464&status=done&style=none&taskId=uf4e7e669-4feb-431a-80b7-f7ab47c9113&title=&width=793)
> - `__Secure-next-auth.session-token`就是你的 session token 啦。

2. 把 session token 填入目录`src/config.js`下的 `ChatGPTSessionToken` 中，然后在终端运行以下命令。如有需要，请在`src/config.js`中配置其它配置变量。

```javascript
  // install dependencies
  npm i

  // 第一种方式:
  // dev
  npm run dev

  //第二种方式
  // build
  npm run build
  // run lib
  node lib/bundle.esm.js
```

3. 执行完之后，可以看到终端控制台输出一下信息，扫码登录即可.
   ![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1670287138908-cc898c58-6e0a-488f-ae07-ae489508c1be.png#averageHue=%23484948&clientId=uf4023d0a-0da7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=442&id=ub5fee6b7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1200&originWidth=1660&originalType=binary&ratio=1&rotation=0&showTitle=false&size=492370&status=done&style=none&taskId=u233d9139-1ef5-42bf-9f44-354c6565862&title=&width=612)

4. 登录成功，用另外一个微信往你扫码登录的微信发消息，你将会收到来自 ChatGPT 的回复。
   ![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1670288278607-73beed83-1a42-42db-8404-72ba60bf2c53.png#averageHue=%234d4e4d&clientId=uf4023d0a-0da7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=437&id=uff52651b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=874&originWidth=1398&originalType=binary&ratio=1&rotation=0&showTitle=false&size=543479&status=done&style=none&taskId=ub5559ec7-30f8-4c07-a9f8-1445a659835&title=&width=699)![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1670288469581-470c7f45-b3db-4a7e-ab01-32b44b812668.png#averageHue=%23f2f2f2&clientId=uf4023d0a-0da7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=230&id=u97e5b1e5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=460&originWidth=1266&originalType=binary&ratio=1&rotation=0&showTitle=false&size=112172&status=done&style=none&taskId=u7d7970df-3044-4534-910c-fdb7b3d2a5b&title=&width=633)

## QA

1. If your WeChat cannot log in
   Please check the root directory of your project, whether there is a file —— `WechatEveryDay.memory-card`, if so, please delete it and try it again.

2. 支持的 node 版本: Node.js >= 16.8

3. 因为 ChatGPT 的长度限制，如果回复消息不完整，可以对它说"请继续" 或者 "请继续写完"。

<img width="621" alt="image" src="https://user-images.githubusercontent.com/39156049/206840335-a64ee27c-df4f-4e70-8604-669fc9468910.png">

4. Error: Failed to launch the browser process puppeteer
   refer to <https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix>

```
// ubuntu
sudo apt-get install chromium-browser
sudo apt-get install  ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils

```

## 👏🏻 欢迎一起共建

欢迎贡献你的代码以及想法 🍵。
