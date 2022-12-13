import { WechatyBuilder } from 'wechaty';
import qrcodeTerminal from 'qrcode-terminal';
import config from './config';
import { replyMessage } from './chatgpt';

async function onMessage(msg) {
  const isText = msg.type() === bot.Message.Type.Text;
  if (msg.self() || !isText) return;
  const contact = msg.talker();
  const contactId = contact.id;
  const content = msg.text().trim();
  const room = msg.room();
  if (room) {
    const prePatten = new RegExp(
      `^${config.groupKey}|@${config.robotName}`,
      'g'
    );
    if (prePatten.test(content)) {
      const groupContent = content.replace(prePatten, '');
      replyMessage(room, groupContent, contactId);
    } else if (await msg.mentionSelf()) {
      const receiver = msg.to();
      const pattern = RegExp(
        `^@${receiver.name()}\\s+${config.groupKey}[\\s]*`
      );
      if (pattern.test(content)) {
        const groupContent = content.replace(pattern, '');
        replyMessage(room, groupContent, contactId);
        const topic = await room.topic();
        console.log(
          `Group name: ${topic} talker: ${await contact.name()} content: ${content}`
        );
        return;
      } else {
        console.log(
          'Content is not within the scope of the customizition format'
        );
      }
    }
  } else {
    if (config.autoReply) {
      if (content.startsWith(config.privateKey)) {
        replyMessage(
          contact,
          content.substring(config.privateKey.length).trim(),
          contactId
        );
        const alias = (await contact.alias()) || (await contact.name());
        console.log(`talker: ${alias} content: ${content}`);
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

const bot = WechatyBuilder.build({
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

// avoid some oops make this process unexception exit
process.on('uncaughtException', (err, origin) => {
  console.error('[uncaughtException]', err, origin);
});
process.on('unhandledRejection', (err, promise) => {
  console.error('[unhandledRejection]', err);
});
