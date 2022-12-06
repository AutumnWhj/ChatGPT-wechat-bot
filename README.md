
# ChatGPT wechat-bot

ChatGPT webchart bot is a WeChat assistant based on NodeJS and webchaty. This tool is more convenient for you to  use ChatGPT, you just chat with it as a good friend or a housekeeper.

## support
1. can reply message when metioning your bot in room(group) https://github.com/AutumnWhj/ChatGPT-wechat-bot/issues/5

## How to use?

1. Firstly, you should have an OpenAI account,  then follow the steps below to get your token. 

Refer to this article: [https://github.com/transitive-bullshit/chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api). 
> To get a session token:
> 1. Go to [https://chat.openai.com/chat](https://chat.openai.com/chat) and log in or sign up.
> 2. Open dev tools.
> 3. Open Application > Cookies. 
> 
![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1670287051371-acd694da-cd3f-46c4-97c4-96438965f8a4.png#averageHue=%232d3136&clientId=uf4023d0a-0da7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=497&id=u77b3570c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=994&originWidth=1586&originalType=binary&ratio=1&rotation=0&showTitle=false&size=796464&status=done&style=none&taskId=uf4e7e669-4feb-431a-80b7-f7ab47c9113&title=&width=793)
> 4. Copy the value for __Secure-next-auth.session-token and save it to your environment.

2. Now, you should fill your Token value into the ChatGPTSessionToken in the directory src/index.js， then run this project on local.
```javascript
// install dependencies
npm/pnpm i

// dev
npm/pnpm run dev

// or 

// build
npm/pnpm run build
// run lib
node lib/bundle.esm.js

```

3. you can see your logs, and scan qrcode to log in wechat.

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1670287138908-cc898c58-6e0a-488f-ae07-ae489508c1be.png#averageHue=%23484948&clientId=uf4023d0a-0da7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=442&id=ub5fee6b7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1200&originWidth=1660&originalType=binary&ratio=1&rotation=0&showTitle=false&size=492370&status=done&style=none&taskId=u233d9139-1ef5-42bf-9f44-354c6565862&title=&width=612)

4. Send a message to your WeChat and you will receive a reply from ChatGPT.

![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1670288278607-73beed83-1a42-42db-8404-72ba60bf2c53.png#averageHue=%234d4e4d&clientId=uf4023d0a-0da7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=437&id=uff52651b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=874&originWidth=1398&originalType=binary&ratio=1&rotation=0&showTitle=false&size=543479&status=done&style=none&taskId=ub5559ec7-30f8-4c07-a9f8-1445a659835&title=&width=699)![image.png](https://cdn.nlark.com/yuque/0/2022/png/2777249/1670288469581-470c7f45-b3db-4a7e-ab01-32b44b812668.png#averageHue=%23f2f2f2&clientId=uf4023d0a-0da7-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=230&id=u97e5b1e5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=460&originWidth=1266&originalType=binary&ratio=1&rotation=0&showTitle=false&size=112172&status=done&style=none&taskId=u7d7970df-3044-4534-910c-fdb7b3d2a5b&title=&width=633)

## QA
1. If your WeChat cannot log in

Please check the root directory of your project, whether there is a file —— `wechaty-puppet-wechat.memory-card.json`, if so, please delete it and try it again.

2. support env
```
"engines": { "node": ">=16", "npm": ">=7" }
```

