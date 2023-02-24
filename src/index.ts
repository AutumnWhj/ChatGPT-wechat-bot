import { WechatyBuilder } from 'wechaty';
import qrcodeTerminal from 'qrcode-terminal';
import config from './config.js';
import { replyMessage, initChatGPT } from './chatgpt.js';

let bot: any = {};
const startTime = new Date();
initProject();
async function onMessage(msg) {
  // 避免重复发送
  if (msg.date() < startTime) {
    return;
  }
  const contact = msg.talker();
  const receiver = msg.to();
  const content = msg.text().trim();
  const room = msg.room();
  const alias = (await contact.alias()) || (await contact.name());
  const isText = msg.type() === bot.Message.Type.Text;
  if (msg.self()) {
    return;
  }

  if (room && isText) {
    const topic = await room.topic();
    console.log(
      `Group name: ${topic} talker: ${await contact.name()} content: ${content}`
    );

    const pattern = RegExp(`^@${receiver.name()}\\s+${config.groupKey}[\\s]*`);
    if (await msg.mentionSelf()) {
      if (pattern.test(content)) {
        const groupContent = content.replace(pattern, '');
        replyMessage(room, groupContent);
        return;
      } else {
        console.log(
          'Content is not within the scope of the customizition format'
        );
      }
    }
  } else if (isText) {
    console.log(`talker: ${alias} content: ${content}`);
    if (config.autoReply) {
      if (content.startsWith(config.privateKey) || config.privateKey === '') {
        let privateContent = content;
        if (config.privateKey !== '') {
          privateContent = content.substring(config.privateKey.length).trim();
        }
        replyMessage(contact, privateContent);
      } else {
        console.log(
          'Content is not within the scope of the customizition format'
        );
      }
    }
  }
}

function onScan(qrcode) {
  qrcodeTerminal.generate(qrcode); // 在console端显示二维码
  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('');

  console.log(qrcodeImageUrl);
}

async function onLogin(user) {
  console.log(`${user} has logged in`);
  const date = new Date();
  console.log(`Current time:${date}`);
  if (config.autoReply) {
    console.log(`Automatic robot chat mode has been activated`);
  }
}

function onLogout(user) {
  console.log(`${user} has logged out`);
}

async function onFriendShip(friendship) {
  if (friendship.type() === 2) {
    if (config.friendShipRule.test(friendship.hello())) {
      await friendship.accept();
    }
  }
}

async function initProject() {
  try {
    await initChatGPT();
    bot = WechatyBuilder.build({
      name: 'WechatEveryDay',
      puppet: 'wechaty-puppet-wechat', // 如果有token，记得更换对应的puppet
      puppetOptions: {
        uos: true,
      },
    });

    bot
      .on('scan', onScan)
      .on('login', onLogin)
      .on('logout', onLogout)
      .on('message', onMessage);
    if (config.friendShipRule) {
      bot.on('friendship', onFriendShip);
    }

    bot
      .start()
      .then(() => console.log('Start to log in wechat...'))
      .catch((e) => console.error(e));
  } catch (error) {
    console.log('init error: ', error);
  }
}
