import { OpenAI } from "openai";
import config from "./config.js";

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY, 
  baseURL: config.OPENAI_BASE_URL
});

const model = config.OPENAI_BOT_MODELS[Math.floor(Math.random() * config.OPENAI_BOT_MODELS.length)]
console.log("model: ", model);

export default class ChatGPT {
  private openai: any;
  private conversations: Record<string, { conversationId?: string; parentMessageId?: string }>;

  constructor() {
    this.openai = openai;
    this.conversations = {};
  }

  async getChatGPTReply(content, contactId) {
    const conversation = this.conversations[contactId] || {};
    const response = await this.openai.chat.completions.create({
      model: model,
      messages: [
        { role: 'system', content: config.OPENAI_BOT_PROMPT },
        ...(conversation.parentMessageId ? [{ role: 'assistant', content: conversation.parentMessageId }] : []),
        { role: 'user', content: content },
      ],
      temperature: 0,
      // max_tokens: 1000, // Uncomment to override max_tokens
    });

    const { messageId, conversationId } = response.choices[0].message;

    this.conversations[contactId] = {
      conversationId,
      parentMessageId: messageId,
    };
    const message = response.choices[0].message.content.trim()
    console.log("response: ", message);
    return message;
  }

  async replyMessage(contact, content) {
    const { id: contactId } = contact;
    try {
      if (
        content.trim().toLocaleLowerCase() ===
        config.resetKey.toLocaleLowerCase()
      ) {
        this.conversations[contactId] = {};
        await contact.say("对话已被重置");
        return;
      }
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
            "\n-----------\nERROR: Please try again, ChatGPT timed out for waiting response."
        );
      }
    }
  }
}