<h1 align="center">ChatGPT-wechat-bot🤖</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> Get a WeChat robot 🤖 based on ChatGPT in a few step.
> [中文文档](README_ZH.md) | English

## Support

- [x] Support conversation.
- [x] Can set keywords to reset the previous conversation.
- [x] Support replying message when mentioning your bot in the group.
- [x] Set the keywords to wake up the WeChat robot in the group.
- [x] Support Dockerfile to deploy.
- [x] Support set retry times when request ChatGPT.
- [ ] Catch conversation error and retry.
- [ ] Other

## Default config

```
{
  // Fill up with session token
  chatGPTSessionToken: '',
  // Setting the number of retries when API error occurs
  retryTimes: 3,
  // Setting keyword to wake up in group chat
  groupKey: '',
  // Setting keyword to wake up in private chat
  privateKey: '',
  // Setting keyword to reset context
  resetKey: 'reset',
  // Enabling auto replies from ChatGPT
  autoReply: true,
  // Using regular expression to automatically pass friends verification
  friendShipRule: /chatgpt|chat/,
  // Using reply mode in group chat
  groupReplyMode: true,
  // Using reply mode in private chat
  privateReplyMode: false,
}
```

## Use with docker

```
// build
docker build --pull --rm -f "Dockerfile" -t wechatbot:latest "."

// run, and then you will see some logs
docker run --name wechatbot wechatbot:latest

```

## How to start?

1. Firstly, you should have an OpenAI account, then follow the steps below to get your token.

   Refer to this article: [`transitive-bullshit/chatgpt-api`](https://github.com/transitive-bullshit/chatgpt-api).

> To get a session token:
>
> - Go to [`chat.openai.com/chat`](https://chat.openai.com/chat) and log in or sign up.
> - Open dev tools.
> - Open Application > Cookies.
>   ![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1670287051371-acd694da-cd3f-46c4-97c4-96438965f8a4.png#averageHue=%232d3136&clientId=uf4023d0a-0da7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=497&id=u77b3570c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=994&originWidth=1586&originalType=binary&ratio=1&rotation=0&showTitle=false&size=796464&status=done&style=none&taskId=uf4e7e669-4feb-431a-80b7-f7ab47c9113&title=&width=793)
> - Copy the value for \_\_Secure-next-auth.session-token and save it to your environment.

2. Now, you should **fill your Token value into the `ChatGPTSessionToken` in the directory `src/config.js`**， then run this project on local.

   _If necessary, configure other customization variables in `src/config.js`._

```javascript
// install dependencies
npm i

// start:
// dev
npm run dev

//or
// build
npm run build
// run lib
node lib/bundle.esm.js
```

3. you can see your logs, and scan qrcode to log in wechat.

   ![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1670287138908-cc898c58-6e0a-488f-ae07-ae489508c1be.png#averageHue=%23484948&clientId=uf4023d0a-0da7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=442&id=ub5fee6b7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1200&originWidth=1660&originalType=binary&ratio=1&rotation=0&showTitle=false&size=492370&status=done&style=none&taskId=u233d9139-1ef5-42bf-9f44-354c6565862&title=&width=612)

4. Send a message to your WeChat and you will receive a reply from ChatGPT.

   ![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1670288278607-73beed83-1a42-42db-8404-72ba60bf2c53.png#averageHue=%234d4e4d&clientId=uf4023d0a-0da7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=437&id=uff52651b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=874&originWidth=1398&originalType=binary&ratio=1&rotation=0&showTitle=false&size=543479&status=done&style=none&taskId=ub5559ec7-30f8-4c07-a9f8-1445a659835&title=&width=699)![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1670288469581-470c7f45-b3db-4a7e-ab01-32b44b812668.png#averageHue=%23f2f2f2&clientId=uf4023d0a-0da7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=230&id=u97e5b1e5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=460&originWidth=1266&originalType=binary&ratio=1&rotation=0&showTitle=false&size=112172&status=done&style=none&taskId=u7d7970df-3044-4534-910c-fdb7b3d2a5b&title=&width=633)

## QA

1. If your WeChat cannot log in
   Please check the root directory of your project, whether there is a file —— `WechatEveryDay.memory-card`, if so, please delete it and try it again.

2. This package is ESM-only. It supports: Node.js >= 16.8

3. how to get all response? you can say "continue".

<img width="621" alt="image" src="https://user-images.githubusercontent.com/39156049/206840335-a64ee27c-df4f-4e70-8604-669fc9468910.png">

4. Error: Failed to launch the browser process puppeteer
   refer to <https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix>

```
// ubuntu
sudo apt-get install chromium-browser
sudo apt-get install  ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils

```

## 👏🏻Contributions

Welcome to contribute your code and ideas🍵.
