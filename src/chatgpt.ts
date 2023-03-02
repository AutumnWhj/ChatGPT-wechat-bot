import { ChatGPTAPI } from 'chatgpt';
import midjourney from 'midjourney-client';
import config from './config.js';
import { retryRequest } from './utils.js';

let chatGPT: any = {};
let chatOption = {};
export function initChatGPT() {
  chatGPT = new ChatGPTAPI({
    apiKey: config.OPENAI_API_KEY,
    // completionParams: {
    //   model: 'text-chat-davinci-002-sh-alpha-aoruigiofdj83',
    // },
  });
}

async function getChatGPTReply(content, contactId) {
  const { conversationId, text, id } = await chatGPT.sendMessage(
    content,
    chatOption[contactId]
  );
  chatOption = {
    [contactId]: {
      conversationId,
      parentMessageId: id,
    },
  };
  console.log('response: ', conversationId, text);
  // response is a markdown-formatted string
  return text;
}

export async function replyMessage(contact, content) {
  const { id: contactId } = contact;
  try {
    if (
      content.trim().toLocaleLowerCase() === config.resetKey.toLocaleLowerCase()
    ) {
      chatOption = {
        ...chatOption,
        [contactId]: {},
      };
      await contact.say('Previous conversation has been reset.');
      return;
    }
    let message = "";

    // console.log(config.privateKey, content.substring(config.privateKey.length).trim(), content);

    if (/^imagine/.test(content)) {
      let draw_content = '' + content.substring("imagine".length).trim();
      const result_draw = await midjourney(draw_content, { timeout: 2000 });
      message = result_draw[0]
      console.log(draw_content, message);
    } else {
      message = await retryRequest(
        () => getChatGPTReply(content, contactId),
        config.retryTimes,
        500
      );
    }

    if (
      (contact.topic && contact?.topic() && config.groupReplyMode) ||
      (!contact.topic && config.privateReplyMode)
    ) {
      const result = content + '\n-----------\n' + message;
      await contact.say(result);
      return;
    } else {
      await contact.say(message);
    }
  } catch (e: any) {
    console.error(e);
    if (e.message.includes('timed out')) {
      await contact.say(
        content +
        '\n-----------\nERROR: Please try again, ChatGPT timed out for waiting response.'
      );
    }
  }
}
