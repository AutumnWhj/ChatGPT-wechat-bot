import { WechatyBuilder } from 'wechaty'
import qrcodeTerminal from 'qrcode-terminal'
import config from './config'
import { replyMessage } from './chatgpt'

async function onMessage(msg) {
  const contact = msg.talker(); 
  const contactId = contact.id
  const receiver = msg.to(); 
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
    if (await msg.mentionSelf()) {
      const [groupContent] = content.split(`@${receiver.name()}`).filter(item => item.trim())
      if(config.groupKey && !groupContent.toLocaleLowerCase().includes(config.groupKey.toLocaleLowerCase())) {
        return
      }
      replyMessage(room, groupContent.trim(), contactId)
    }
  } else if (isText) {
    console.log(`talker: ${alias} content: ${content}`);
    if (config.autoReply) {
      if (content) {
        replyMessage(contact, content, contactId)
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
      await friendship.accept()
    }
  }
}

const bot = WechatyBuilder.build({
  name: 'WechatEveryDay',
  puppet: 'wechaty-puppet-wechat', // 如果有token，记得更换对应的puppet
  puppetOptions: {
    uos: true
  }
})

bot.on('scan', onScan)
  .on('login', onLogin)
  .on('logout', onLogout)
  .on('message', onMessage)
if (config.friendShipRule) {
  bot.on('friendship', onFriendShip);
}


bot
  .start()
  .then(() => console.log('Start to log in wechat...'))
  .catch((e) => console.error(e));


