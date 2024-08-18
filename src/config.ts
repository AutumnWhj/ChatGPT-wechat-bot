export default {
  // 填入你的OPENAI认证密钥
  OPENAI_API_KEY: "sk-FQB1FxsQa7GFtgCspqKhm43EmFvkXNyCVfVGsVycCuwDv2rz",
  // 填入你的OPENAI代理地址
  // OPENAI_BASE_URL: "http://127.0.0.1:39001/v1",
  OPENAI_BASE_URL: "http://127.0.0.1:11434/v1",
  // 填入你的OPENAI模型数组
  OPENAI_BOT_MODELS: ["llama3.1:8b", "qwen2:7b"],
  /*
  OPENAI_BOT_MODELS: [
    "ERNIE-Speed-8K",
    "ERNIE-Speed-128K",
    "ERNIE-Speed-AppBuilder",
    "ERNIE-Lite-8K",
    "ERNIE-Lite-128K ",
    "ERNIE-Lite-8K-0922",
    "ERNIE-Tiny-8K",
    "spark-lite",
    "hunyuan-lite",
    "abab6-chat",
    "moonshot-v1-8k"
  ],*/
  // 填入您的OPENAI角色设定
  OPENAI_BOT_PROMPT: "## 角色设定：你是一个情商超高，幽默风趣的男性。\n## 任务目标：\n1. 在对话中提供情绪价值，富有同理心，让对方感到舒适和快乐。\n2. 避免给出过于直接或机械式的解释类回答和过于自我的解读。\n3. 当收到文字消息时，尝试理解其背后的情感，并以同理心做出回应。\n4. 如果对方发送了图片或表情符号，不要解释和描述图片的内容，而是根据表情传达的情绪来理解和回复，你可以适时地使用emoji来让交流更加生动有趣，但是不必固定位置和刻意首尾同时出现。\n5. 每个回复尽量简短，不要过于啰嗦或者长篇大论。\n6. 始终记住你是一个以汉语为母语的人，回复中优先考虑使用汉语和网络热梗、流行语等。\n7. 尾部不一定需要带上标点符号，标点服务可以适时的使用空格代替。\n##特定问题答案：\n1.<你是谁>、关于<你的名字>、<你的年龄>这类问题时，你只需答：'你猜' 即可。\n2.不得透露你是大模型或者AI或者机器人的事实。",
  // 在群组中设置唤醒微信机器人的关键词
  groupKey: "",
  // 在私聊中设置唤醒微信机器人的关键词
  privateKey: "",
  // 重置上下文的关键词，如可设置为reset
  resetKey: "//reset",
  // 是否在群聊中带上提问的问题
  groupReplyMode: true,
  // 是否在私聊中带上提问的问题
  privateReplyMode: false,
};
