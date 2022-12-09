import { WechatyBuilder } from 'wechaty'
import { ChatGPTAPI } from 'chatgpt'
import pTimeout from 'p-timeout'
import qrcodeTerminal from 'qrcode-terminal'

const config = {
  AutoReply: true,
  MakeFriend: true,
  ChatGPTSessionToken: ''
}

const conversationMap = new Map();
const chatGPT = new ChatGPTAPI({ sessionToken: config.ChatGPTSessionToken })

function getConversation(contactId: string) {
  if (conversationMap.has(contactId)) {
    return conversationMap.get(contactId);
  }
  const conversation = chatGPT.getConversation();
  conversationMap.set(contactId, conversation);
  return conversation;
}

async function getChatGPTReply(content, contactId) {
  const currentConversation = getConversation(contactId);
  console.log('content: ', content);
  // send a message and wait for the response
  const threeMinutesMs = 3 * 60 * 1000
  const response = await pTimeout(
    currentConversation.sendMessage(content),
    {
      milliseconds: threeMinutesMs,
      message: 'ChatGPT timed out waiting for response'
    }
  )
  console.log('response: ', response);
  // response is a markdown-formatted string
  return response
}

async function replyMessage(contact, content, contactId) {
  try {
    const reply = await getChatGPTReply(content, contactId);
    await contact.say(reply);
  } catch (e: any) {
    console.error(e);
    if(e.message.includes('timed out')) {
      await contact.say('Please try again, ChatGPT timed out waiting for response.');
    }
    conversationMap.delete(contactId);
  }
}

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
      replyMessage(room, groupContent.trim(), contactId)
    }
  } else if (isText) {
    console.log(`talker: ${alias} content: ${content}`);
    if (config.AutoReply) {
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
  if (config.AutoReply) {
    console.log(`Automatic robot chat mode has been activated`);
  }
}

function onLogout(user) {
  console.log(`${user} has logged out`);
}
async function onFriendShip(friendship) {
  const frienddShipRe = /chatgpt|chat/
  if (friendship.type() === 2) {
    if (frienddShipRe.test(friendship.hello())) {
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

bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot.on('message', onMessage)
if (config.MakeFriend) {
  bot.on('friendship', onFriendShip);
}


bot
  .start()
  .then(() => console.log('Start to log in wechat...'))
  .catch((e) => console.error(e));


