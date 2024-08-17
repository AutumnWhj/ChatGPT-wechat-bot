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
- [ ] 其他


## 合作

## 默认配置

``` javascript
{
  // 填入你的OPENAI认证密钥
  OPENAI_API_KEY: "sk-FQB1FxsQa7GFtgCspqKhm43EmFvkXNyCVfVGsVycCuwDv2rz",
  // 填入你的OPENAI代理地址
  OPENAI_BASE_URL: "http://127.0.0.1:11434/v1",
  // 填入你的OPENAI模型数组
  models: ["llama3.1:8b", "qwen2:7b"],
  /*
  models: [
    "ERNIE-Speed-8K",
    "ERNIE-Speed-128K",
    "ERNIE-Speed-AppBuilder",
    "ERNIE-Lite-8K",
    "ERNIE-Lite-128K ",
    "ERNIE-Lite-8K-0922",
    "ERNIE-Tiny-8K",
    "spark-lite",
    "hunyuan-lite",
    "abab6-chat",
    "moonshot-v1-8k"
  ],
  */
  // 在群组中设置唤醒微信机器人的关键词
  groupKey: "",
  // 在私聊中设置唤醒微信机器人的关键词
  privateKey: "",
  // 重置上下文的关键词，如可设置为reset
  resetKey: "reset",
  // 是否在群聊中带上提问的问题
  groupReplyMode: true,
  // 是否在私聊中带上提问的问题
  privateReplyMode: false,
}
```

## 开始设置机器人 🤖

1. 首先，需要按照以下步骤获你的 ChatGPT 的 OPENAI_API_KEY.

> 获取你的 OPENAI_API_KEY:
>
> - 打开 [https://platform.openai.com/overview](https://platform.openai.com/overview) 并登录注册，进入网页。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/2777249/1675413138418-d5df2543-bd37-41cc-a16c-505c5a38e88d.png)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/2777249/1675413190188-4cf10947-ea7f-479d-9550-0dec9d40c0e2.png?x-oss-process=image%2Fresize%2Cw_1500%2Climit_0)

2. 把 OPENAI_API_KEY 填入目录`src/config.ts`下的 `OPENAI_API_KEY` 中

3. 把 OPENAI_BASE_URL 填入目录`src/config.ts`下的 `OPENAI_BASE_URL` 中，如何设置可看下面介绍。

4. 然后在终端运行以下命令。如有需要，请在`src/config.ts`中配置其它配置变量。

```javascript
  // 安装依赖
  npm i
  npm run dev

  // 也可以使用pnpm
  npm i -g pnpm
  pnpm i
  pnpm run dev

```

3. 执行完之后，可以看到终端控制台输出一下信息，扫码登录即可.
   ![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1670287138908-cc898c58-6e0a-488f-ae07-ae489508c1be.png#averageHue=%23484948&clientId=uf4023d0a-0da7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=442&id=ub5fee6b7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1200&originWidth=1660&originalType=binary&ratio=1&rotation=0&showTitle=false&size=492370&status=done&style=none&taskId=u233d9139-1ef5-42bf-9f44-354c6565862&title=&width=612)

4. 登录成功，用另外一个微信往你扫码登录的微信发消息，你将会收到来自 ChatGPT 的回复。
   ![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1670288278607-73beed83-1a42-42db-8404-72ba60bf2c53.png#averageHue=%234d4e4d&clientId=uf4023d0a-0da7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=437&id=uff52651b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=874&originWidth=1398&originalType=binary&ratio=1&rotation=0&showTitle=false&size=543479&status=done&style=none&taskId=ub5559ec7-30f8-4c07-a9f8-1445a659835&title=&width=699)![image.png](https://cdn.nlark.com/yuque/0/2023/png/2777249/1680258120110-20343826-d2dc-4fd5-9f94-1a40e43940bb.png?x-oss-process=image%2Fresize%2Cw_1270%2Climit_0)

## 设置反向代理

- 注意：以下反向代理仅支持ChatGPT)

ChatGPT API 代理<https://hub.docker.com/r/mirrors2/chatgpt-api-proxy>

chatgpt api 代理,已验证 OpenCat,AssisChat,AMA(问天),chathub

可配置好 OPENAI_API_KEY 分享代理地址给他人用.

快速开始

``` bash
docker run -d -p 80:80 --name chatgpt-api-proxy mirrors2/chatgpt-api-proxy

# 可选 -e OPENAI_API_KEY={nide_api_key}
```

docker 跑起来之后你的代理地址就生效了：

官方的：`https://api.openai.com/v1`

你的： `你的域名/v1` 或者 `你的服务器ip和端口/v1`

## QA

1. 微信无法取消登录问题

   可以直接删除`WechatEveryDay.memory-card`文件，重新跑程序

2. 支持的 node 版本: Node.js >= 16.8

3. 因为 ChatGPT 的长度限制，如果回复消息不完整，可以对它说"请继续" 或者 "请继续写完"。

<img width="621" alt="image" src="https://user-images.githubusercontent.com/39156049/206840335-a64ee27c-df4f-4e70-8604-669fc9468910.png">

4. Error: Failed to launch the browser process puppeteer
   refer to <https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix>

``` bash
# ubuntu
sudo apt-get install chromium-browser
sudo apt-get install  ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
```

## 👏🏻 欢迎一起共建

欢迎贡献你的代码以及想法 🍵。

## 原作者

forked from [AutumnWhj/ChatGPT-wechat-bot](https://github.com/AutumnWhj/ChatGPT-wechat-bot)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=lopins/ChatGPT-wechat-bot&type=Date)](https://star-history.com/#lopins/ChatGPT-wechat-bot&Date)
