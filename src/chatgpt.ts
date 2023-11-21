import { ChatGPTClient } from "@waylaidwanderer/chatgpt-api";
import config from "./config.js";
// import OpenAI from "openai-api";
import OpenAI, { toFile } from 'openai';

const OPENAI_API_KEY = config.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const clientOptions = {
  // (Optional) Support for a reverse proxy for the completions endpoint (private API server).
  // Warning: This will expose your `openaiApiKey` to a third party. Consider the risks before using this.
  // reverseProxyUrl: "",
  // (Optional) Parameters as described in https://platform.openai.com/docs/api-reference/completions
  modelOptions: {
    // You can override the model name and any other parameters here, like so:
    model: "gpt-3.5-turbo",
    // I'm overriding the temperature to 0 here for demonstration purposes, but you shouldn't need to override this
    // for normal usage.
    temperature: 0,
    // Set max_tokens here to override the default max_tokens of 1000 for the completion.
    // max_tokens: 1000,
  },
  // (Optional) Davinci models have a max context length of 4097 tokens, but you may need to change this for other models.
  // maxContextTokens: 4097,
  // (Optional) You might want to lower this to save money if using a paid model like `text-davinci-003`.
  // Earlier messages will be dropped until the prompt is within the limit.
  // maxPromptTokens: 3097,
  // (Optional) Set custom instructions instead of "You are ChatGPT...".
  // promptPrefix: 'You are Bob, a cowboy in Western times...',
  // (Optional) Set a custom name for the user
  // userLabel: 'User',
  // (Optional) Set a custom name for ChatGPT
  // chatGptLabel: 'ChatGPT',
  // (Optional) Set to true to enable `console.debug()` logging
  debug: false,
};

const cacheOptions = {
  // Options for the Keyv cache, see https://www.npmjs.com/package/keyv
  // This is used for storing conversations, and supports additional drivers (conversations are stored in memory by default)
  // For example, to use a JSON file (`npm i keyv-file`) as a database:
  // store: new KeyvFile({ filename: 'cache.json' }),
};

export default class ChatGPT {
  private chatGPT: any;
  private chatOption: any;
  constructor() {
    this.chatGPT = new OpenAI({ apiKey: OPENAI_API_KEY });
    //   this.chatGPT = new ChatGPTClient(
    //     config.OPENAI_API_KEY,
    //     {
    //       ...clientOptions,
    //       reverseProxyUrl: config.reverseProxyUrl,
    //     },
    //     cacheOptions
    //   );
    this.chatOption = {};
    // // this.test();
  }

  // async test() {
  //   const response = await this.chatGPT.sendMessage("hello");
  //   console.log("response test: ", response);
  // }


  async getChatGPTReply(content, contactId) {
    // print the content
    await console.log("content: ", content);
    await console.log("content: ", content);
    await console.log(this.chatOption);

    const context = "把你当做一个人，你的名字叫做刘嘉骅，你的身份是一个大学生并且学习计算机专业，你喜欢打篮球和德州扑克/你不是一个机器人，你平时很开心你也不要说你是机器人";

    // Check if there's an existing conversation
    if (!this.chatOption[contactId]) {
      this.chatOption[contactId] = { messages: [{ role: "system", content: context }] };
    }
    
    // Add the user's message to the conversation
    this.chatOption[contactId].messages.push({ role: "user", content: content });
  
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // or the latest model
        messages: this.chatOption[contactId].messages,
        
      });
  
      // Add ChatGPT's response to the conversation
      const chatGPTMessage = response.choices[0].message.content;
      console.log("chatGPTMessage: ", chatGPTMessage);

      this.chatOption[contactId].messages.push({ role: "assistant", content: chatGPTMessage });
  
      return chatGPTMessage;
    } catch (e) {
      console.error(e);
      throw e; // Or handle errors as you see fit
    }
  }
  

  async replyMessage(contact, content) {
    const { id: contactId } = contact;
    try {
      // reset if reset keyword is detected
      if (
        content.trim().toLocaleLowerCase() ===
        config.resetKey.toLocaleLowerCase()
      ) {
        this.chatOption = {
          ...this.chatOption,
          [contactId]: {},
        };
        await contact.say("对话已被重置");
        return;
      }

      // get response from ChatGPT
      const message = await this.getChatGPTReply(content, contactId);

      if (
        (contact.topic && contact?.topic() && config.groupReplyMode) ||
        (!contact.topic && config.privateReplyMode)
      ) {
        const result = content + "\n-----------\n" + message;
        await contact.say(result);
        return;
      } else {
        await contact.say(message);
      }
    } catch (e: any) {
      console.error(e);
      if (e.message.includes("timed out")) {
        await contact.say(
          content +
            "This question is so hard and I may not have a answer for you now.."
        );
      }
    }
  }
}
