
<h1 align="center">ChatGPT-wechat-bot🤖</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> 几步即可获得一个基于ChatGPT的微信机器人🤖。   
[English](README.md) | 中文文档

## Support
- [x] 支持上下文语境的对话.
- [x] 支持通过关键词重置对话的上下文语境.
- [x] 支持在群聊@你的机器人🤖.
- [x] 支持通过关键词唤醒你的机器人🤖.
- [x] 支持Docker运行.
- [ ] 捕获错误❎并重试.
- [ ] 其他

## 用Docker运行 
```
// build
docker build --pull --rm -f "Dockerfile" -t wechatbot:latest "."

// run, and then you will see some logs 
docker run --name wechatbot wechatbot:latest

```
## 开始设置机器人🤖

1. 首先，需要按照以下步骤获你的ChatGPT的session token. 
> 获取你的 session token:
> - 打开 [https://chat.openai.com/chat](https://chat.openai.com/chat) 并登录注册，进入网页。
>  - 打开浏览器的 dev tools（按F12）.
>  - 从顶栏中选择Application > Cookies.
  ![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1670287051371-acd694da-cd3f-46c4-97c4-96438965f8a4.png#averageHue=%232d3136&clientId=uf4023d0a-0da7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=497&id=u77b3570c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=994&originWidth=1586&originalType=binary&ratio=1&rotation=0&showTitle=false&size=796464&status=done&style=none&taskId=uf4e7e669-4feb-431a-80b7-f7ab47c9113&title=&width=793)
>  -  `__Secure-next-auth.session-token`就是你的session token啦。

2. 把  session token 填入目录`src/config.js`下的 `ChatGPTSessionToken` 中，然后在终端运行以下命令。

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

4. 登录成功，用另外一个微信往你扫码登录的微信发消息，你将会收到来自ChatGPT的回复。
    ![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1670288278607-73beed83-1a42-42db-8404-72ba60bf2c53.png#averageHue=%234d4e4d&clientId=uf4023d0a-0da7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=437&id=uff52651b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=874&originWidth=1398&originalType=binary&ratio=1&rotation=0&showTitle=false&size=543479&status=done&style=none&taskId=ub5559ec7-30f8-4c07-a9f8-1445a659835&title=&width=699)![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1670288469581-470c7f45-b3db-4a7e-ab01-32b44b812668.png#averageHue=%23f2f2f2&clientId=uf4023d0a-0da7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=230&id=u97e5b1e5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=460&originWidth=1266&originalType=binary&ratio=1&rotation=0&showTitle=false&size=112172&status=done&style=none&taskId=u7d7970df-3044-4534-910c-fdb7b3d2a5b&title=&width=633)

## QA
1. If your WeChat cannot log in
Please check the root directory of your project, whether there is a file —— `WechatEveryDay.memory-card`, if so, please delete it and try it again.

2. This package is ESM-only. It supports: Node.js >= 16.8

## 👏🏻欢迎一起共建

欢迎贡献你的代码以及想法🍵。
