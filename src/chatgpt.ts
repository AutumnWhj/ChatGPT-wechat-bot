import { OpenAI } from 'openai';
import config from './config.js';

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
  baseURL: config.OPENAI_BASE_URL
});

export default class ChatGPT {
  private openai: any;
  private conversations: Record<string, { conversationId: string; parentMessageId: string }>;

  constructor() {
    this.openai = openai;
    this.conversations = {};
  }

  async sendMessage(content: string, contactId: string): Promise<{ response: string }> {
    const conversation = this.conversations[contactId] || { parentMessageId: '' };

    try {
      const response = await this.openai.chat.completions.create({
        model: config.models[Math.floor(Math.random() * config.models.length)],
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: content },
          ...(conversation.parentMessageId ? [{ role: 'assistant', content: conversation.parentMessageId }] : [])
        ],
        temperature: 0,
        // max_tokens: 1000, // Uncomment to override max_tokens
      });

      this.conversations[contactId] = {
        conversationId: response.id,
        parentMessageId: response.choices[0].message.content,
      };

      return { response: response.choices[0].message.content };
    } catch (error) {
      console.error('Error in sendMessage:', error);
      throw new Error('Failed to send message.');
    }
  }

  async replyMessage(contact, content) {
    const { id: contactId } = contact;
    try {
      if (content.trim().toLowerCase() === config.resetKey.toLowerCase()) {
        delete this.conversations[contactId];
        await contact.say('对话已被重置');
        return;
      }

      const message = await this.sendMessage(content, contactId);

      const shouldSendFullResponse = (contact.topic && config.groupReplyMode) || (!contact.topic && config.privateReplyMode);
      const responseText = shouldSendFullResponse
        ? `${content}\n-----------\n${message.response}`
        : message.response;

      await contact.say(responseText);
    } catch (e: any) {
      console.error('Error in replyMessage:', e);
      let errorMessage = '发生了一个错误，请稍后重试。';
      if (e.message.includes('timed out')) {
        errorMessage = `请求超时，请稍后再试。\n原始消息: ${content}`;
      }
      await contact.say(errorMessage);
    }
  }
}