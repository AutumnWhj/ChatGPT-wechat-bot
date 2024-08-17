import OpenAI from 'openai';
import config from "./config.js";

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY, 
  baseURL: config.OPENAI_BASE_URL
});

// Optionally set up a custom handler for rate limits, errors, etc.
// openai.configure({
//   dangerouslyAllowServerSideUsage: true, // Enable server-side usage (be cautious with this setting)
// });

export default class ChatGPT {
  private openai: any;
  private conversations: Record<string, { conversationId: string; parentMessageId: string }>;

  constructor() {
    this.openai = openai;
    this.conversations = {};
  }

  async sendMessage(content: string, contactId: string): Promise<{ response: string }> {
    const conversation = this.conversations[contactId] || {};

    const response = await this.openai.chat.completions.create({
      model: config.models[Math.floor(Math.random() * config.models.length)],
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' }, // Optional system message
        { role: 'user', content: content },
        ...(conversation.parentMessageId ? [{ role: 'assistant', content: conversation.parentMessageId }] : [])
      ],
      temperature: 0, // Override temperature
      // max_tokens: 1000, // Uncomment to override max_tokens
    });

    this.conversations[contactId] = {
      conversationId: response.id, // Use the completion ID as a conversation ID
      parentMessageId: response.choices[0].message.content,
    };

    return { response: response.choices[0].message.content };
  }

  async replyMessage(contact, content) {
    const { id: contactId } = contact;
    try {
      if (
        content.trim().toLowerCase() ===
        config.resetKey.toLowerCase()
      ) {
        delete this.conversations[contactId];
        await contact.say('对话已被重置');
        return;
      }
      const message = await this.sendMessage(content, contactId);

      if (
        (contact.topic && contact.topic() && config.groupReplyMode) ||
        (!contact.topic && config.privateReplyMode)
      ) {
        const result = `${content}\n-----------\n${message.response}`;
        await contact.say(result);
      } else {
        await contact.say(message.response);
      }
    } catch (e: any) {
      console.error(e);
      if (e.message.includes('timed out')) {
        await contact.say(
          `${content}\n-----------\nERROR: Please try again, ChatGPT timed out for waiting response.`
        );
      }
    }
  }
}