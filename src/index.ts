import {WechatyBuilder} from 'wechaty'
import {ChatGPTAPI} from 'chatgpt'
import pTimeout from 'p-timeout'
import qrcodeTerminal from 'qrcode-terminal'

const config = {
    AutoReply: true,
    MakeFriend: true,
    CustomParameter: '-a',
    ChatGPTSessionToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..3hzq_mRxvCdPhC_b.KRFuuohn7QT9lFKBn9-oH3VDkF69oCZaz0UqoGcQilh5aQ83V4kJ9Nin4Nq-9Kct634kqUYXCsecP5VlMn9KBSYZUdABJ6iHR6oeUsxcLo8Z2kKs4rD-fnHQF90uMdM7Otlg_rfejy-e5Ebd4rz-uiNJZgEQ9NKmFOJKRwoFHWQqtWAs6QKTikNtxO-PjQavvGQYONUD1rSIjMUfB3I07Wo2jt69cf13oaoCBv-xpjF9sxIbjM1d4XG2bMKYZDZG-znPC1d4wsiSrRzBcMwTaEW3SVAasjAXako4mWMvO5ozs6linVM9zJMZ8iUur9piv929XmQvr_Hm97CAPfZLE1QDxzA5dE0sCL5Mpu_sedoYgeR7cBF14nedgAsraHlWO1W-98nOdWeoa3L0ot3xgAsHTpqZoMV8zp9vk_SRvG2D450Nndbv8goaydsvsXkn1MCsN7FstYbispxg5CEF5ceVdLZ-wfIpC1HOZ37ZZ1Nk8Zsz_xSHHoPYakxz-zRhU6epFkCe9-ieofI-J3vvk32jtXursYfXj_lDwwQmVUNegk-t_0_IpQQ39J1fWzU0vAOepPsUldWiA125Qx9JsR3PatgfQvySts8nHA_ePPzjRQuVbuE0hNaKk9hhhlghxtD10yMSQ31Vdluplia6sykJgFKAHfd9hOttibnO7jxtSJBrPkuRcKUt7HWKkezHtrofUJJAD3BZ9sx6VhfkxUgpLTljFwYIBuFiWUNk65FJ_yKcjRqENpVJAiUfZto4YxPuAsdYN_u60o7bSnOSEYcAMwYPZ_TRlClOXHe7L95cot7mHbpFF03k5QTDkTvuLvKMeyUkQCtlxfYAx0aL7uRkJQJHuqDl7ywsH9BF6rQWHdTshaIKZEe4BKmpot3fZVkfEq9ZdfixACsSmtEYKDNsgIk546wjJO1CvVy8OQu_1FDs3JU6tT5I5qOWXN3eZSpBT1Ul-eOBsFsxtz5L_o1sQET27MBwfzoxWaGCzaWrmBNoDRdHQTPhj03yfoTrHujBzOmC71M4fmCx1E7swQTc7bh6Mnung10BPvGzx02a7pFc-Ia_XA5zXVrfbBlf4AZwimNgMXQGDn-z7GB2r4C6dwX0OLVoc4sPyM3LTGGHEdVYSX4MfFN0pSYCxkFH67lSBRbvBedkyjS3OxzefVK08Zz2cxeQtMbWA_E-NY3iAE7lL5hY_tO0L22tSDCsjQTVr7PQS7_7CEUVPe4uy2g-0p949w1ytPOBWixgQJzz6NuK3AX6wjExrpPpsP-MDScY5pLu460if5xQcPkVM8uL-Fgt8qAyl1Z2W4aERUdX4782DUE0v3WlJ7w1kxQ1u4mp6LoARRIfhVq1ySF1KnYpsD1QkS8iwRxlgHf72ZMmyhSeyeMGal65OCZtXGZ4WfM58QjGMvLxETqRzhiMNLF8XcszqbrSohojxFrOXswS2KQ9POSdRdK4QHdhRdOoeMDf18hQC4LWpNHkSQn4DA3n91EQTRMPD8M7AuxCrzpQI-_pf_AFh7lwsVCzGhnbsgOFQE5RS7Ye8COpo1WIyVe-2Q_d2_46TQSfZh0pe2YM8RwiwnXQPVkXAOaFZu5GzhLl3g8yjqU0vSGWdgSLKVxllM2ckDsSPySDc3sjXaBMW7QTN8LSSRfou4yJDoguFk8awe_mFD50GA9otDqMzEe0Ls77Ni70Lj4Zs84Ep31KY2UyF24XTEeD2W5LBchE1puhQkgf5kB7vVNj04tfPrm_OKE6kYeSORoz_gS3GpZi-qUiPRhWNuG8t-SNar8p72bYS-caN1p1-o_Uc6uqr0A_hZ_eXReGHW6uLFp75dXWhcKBcH9ZwgXFFXWW_TPPCJrh4xenRHIrIZfEQloZ1tt9p6J8rVIG41lH-sBf8rOCbTJVqubpJ_qTDK9ir9mGsDx6DHlRBifF8C1N0Sa_Jazfh6OxGPdCNJexFojptWDFqmjEJBaerViodf1-I6pR18yvg05sf4ZrN3zyXwheYh6NOFSXqlOdH2LavqQq64udru9ZdKQeWFisRGSNP-Jo5FNnN0Drk2bXh8BI97oj1jl13DlzxI2r5ReZ8jJtI_3TPvuUqlilB5Cw-eSzKFQYD1LSzeXXCWitYN6XZsfmQRCj359rcgfdpNW9wXFGazmix9BA1hM8X9oZmnMKAL0lCmkhqr4Jsrw5DalAx7yyU4sjtlv9aUWUz9PNFFEhtDXkb6D4hNOkuryg9eO3jIln7U8QDGliJrwv4diWEAjU9NObcrfH9F8edh08MoLNBw5Txg.m6JS3S0ouTmDkj7HYnVSRg'
}

const pattern = RegExp('@.*' + config.CustomParameter + ' ');

const conversationMap = new Map();
const chatGPT = new ChatGPTAPI({sessionToken: config.ChatGPTSessionToken})

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
    return content + '\n-----------\nReply:' + response
}

async function replyMessage(contact, content, contactId) {
    try {
        const reply = await getChatGPTReply(content, contactId);
        await contact.say(reply);
    } catch (e: any) {
        console.error(e);
        if (e.message.includes('timed out')) {
            await contact.say(content + '\n-----------\nERROR: Please try again, ChatGPT timed out for waiting response.');
        }
        conversationMap.delete(contactId);
    }
}

async function onMessage(msg) {
    const contact = msg.talker();
    const contactId = contact.id;
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
        if (await msg.mentionSelf() && pattern.test(content)) {
            const groupContent = content.replace(pattern, "");
            if (groupContent) {
                // console.log(`Asking content: ${groupContent}`);
                replyMessage(room, groupContent.trim(), contactId);
            } else {
                console.log('Content is empty');
            }
        } else {
            console.log('Content is not within the scope of the customizition format');
        }
    } else if (isText) {
        console.log(`talker: ${alias} content: ${content}`);
        if (config.AutoReply) {
            if (content.startsWith(config.CustomParameter)) {
                // console.log(`Asking content: ${content.substring(config.CustomParameter.length)}`);
                replyMessage(contact, content.substring(config.CustomParameter.length).trim(), contactId);
            } else {
                console.log('Content is not within the scope of the customizition format');
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


