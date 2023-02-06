const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const retryTimes = process.env.retryTimes;
const groupKey = process.env.groupKey;
const privateKey = process.env.privateKey;
const resetKey = process.env.resetKey;
const autoReply = process.env.autoReply;
const friendShipRule = process.env.friendShipRule;
const groupReplyMode = process.env.groupReplyMode;
const privateReplyMode = process.env.privateReplyMode;

export default {
  // 填入你的session token
  OPENAI_API_KEY: OPENAI_API_KEY || '',
  // 设置获取消息的重试次数
  retryTimes: retryTimes || 3,
  // 在群组中设置唤醒微信机器人的关键词
  groupKey: groupKey || '',
  // 在私聊中设置唤醒微信机器人的关键词
  privateKey: privateKey || '',
  // 重置上下文的关键词，如可设置为reset
  resetKey: resetKey || 'reset',
  // 开启会后收到ChatGPT的自动回复
  autoReply: autoReply || true,
  // 根据正则匹配是否自动通过好友验证
  friendShipRule: friendShipRule || /chatgpt|chat/,
  // 是否在群聊中按照回复的格式进行回复
  groupReplyMode: groupReplyMode || true,
  // 是否在私聊中按照回复的格式进行回复
  privateReplyMode: privateReplyMode || false,
};
