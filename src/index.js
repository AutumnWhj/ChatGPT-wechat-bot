import { WechatyBuilder } from 'wechaty'
import { ChatGPTAPI } from 'chatgpt'
import qrcodeTerminal from 'qrcode-terminal'

const config = {
  AUTOREPLY: true,
  ChatGPTSessionToken: ''
}

async function getChatGPTReply(content) {
  const api = new ChatGPTAPI({ sessionToken: config.ChatGPTSessionToken})
  // ensure the API is properly authenticated (optional)
  const ensureAuth = await api.ensureAuth()
  console.log('content: ', content);
  // send a message and wait for the response
  const response = await api.sendMessage(content)
  console.log('response: ', response);
  // response is a markdown-formatted string
  return response
}

async function onMessage(msg) {
  const contact = msg.talker(); 
  const content = msg.text();
  const room = msg.room(); 
  const alias = await contact.alias() || await contact.name();
  const isText = msg.type() === bot.Message.Type.Text;
  if (msg.self()) {
    return;
  }

  if (room && isText) {
    const topic = await room.topic();
    console.log(`Group name: ${topic} talker: ${await contact.name()} content: ${content}`);
  } else if (isText) {
    console.log(`talker: ${alias} content: ${content}`);
     if (config.AUTOREPLY) {
      if (content) {
        const reply = await getChatGPTReply(content);
        try {
          await contact.say(reply);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}


function onScan(qrcode, status) {
  qrcodeTerminal.generate(qrcode); // 在console端显示二维码
  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('');

  console.log(qrcodeImageUrl);
}

async function onLogin(user) {
  console.log(`${user} has logged in`);
  const date = new Date()
  console.log(`Current time:${date}`);
  if (config.AUTOREPLY) {
    console.log(`Automatic robot chat mode has been activated`);
  }
}

function onLogout(user) {
  console.log(`${user} has logged out`);
}

const bot = WechatyBuilder.build({
  name: 'WechatEveryDay',
  puppet: 'wechaty-puppet-wechat', // 如果有token，记得更换对应的puppet
  puppetOptions: {
    uos: true
  }
})

bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot.on('message', onMessage);

bot
  .start()
  .then(() => console.log('Start to log in wechat...'))
  .catch((e) => console.error(e));
