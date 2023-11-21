import { WechatyBuilder } from "wechaty";
import qrcodeTerminal from "qrcode-terminal";
import config from "./config.js";
import ChatGPT from "./chatgpt.js";
import dotenv from 'dotenv';
import path from 'path';


console.log("current: ", process.cwd());
dotenv.config();
// const API_KEY = process.env.OPENAI_API_KEY;
console.log('Environment Variables:', process.env.OPENAI_API_KEY);
// console.log("API_KEY: ", API_KEY);


let bot: any = {};
const startTime = new Date();
let chatGPTClient: any = null;
initProject();
async function onMessage(msg) {
  // 避免重复发送
  if (msg.date() < startTime) {
    return;
  }

  // talker means sender
  const contact = msg.talker();

  // receiver means the bot
  const receiver = msg.to();

  // content means message
  const content = msg.text().trim();

  // room means group
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
        const groupContent = content.replace(pattern, "");
        chatGPTClient.replyMessage(room, groupContent);
        return;
      } else {
        console.log(
          "Content is not within the scope of the customizition format"
        );
      }
    }
  } else if (isText) {
    console.log(`talker: ${alias} content: ${content}`);
    if (content.startsWith(config.privateKey) || config.privateKey === "") {
      let privateContent = content;
      if (config.privateKey === "") {
        privateContent = content.substring(config.privateKey.length).trim();
      }
      chatGPTClient.replyMessage(contact, privateContent);
    } else {
      console.log(
        "Content is not within the scope of the customizition format"
      );
    }
  }
}

// 在console端显示二维码
function onScan(qrcode) {
  qrcodeTerminal.generate(qrcode, { small: true }); 
  const qrcodeImageUrl = [
    "https://api.qrserver.com/v1/create-qr-code/?data=",
    encodeURIComponent(qrcode),
  ].join("");

  console.log(qrcodeImageUrl);
}

// function to be called when bot login
async function onLogin(user) {
  console.log(`${user} has logged in`);
  const date = new Date();
  console.log(`Current time:${date}`);
}

// function to be called when bot logout
function onLogout(user) {
  console.log(`${user} has logged out`);
}

async function initProject() {
  try {
    chatGPTClient = new ChatGPT();
    bot = WechatyBuilder.build({
      name: "WechatEveryDay",
      puppet: "wechaty-puppet-wechat", // 如果有token，记得更换对应的puppet
      puppetOptions: {
        uos: true,
      },
    });

    bot
      .on("scan", onScan)
      .on("login", onLogin)
      .on("logout", onLogout)
      .on("message", onMessage);

    bot
      .start()
      .then(() => console.log("Start to log in wechat..."))
      .catch((e) => console.error(e));
  } catch (error) {
    console.log("init error: ", error);
  }
}
