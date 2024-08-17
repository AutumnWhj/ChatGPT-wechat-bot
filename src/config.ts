export default {
  // 填入你的OPENAI认证密钥
  OPENAI_API_KEY: "sk-FQB1FxsQa7GFtgCspqKhm43EmFvkXNyCVfVGsVycCuwDv2rz",
  // 填入你的OPENAI代理地址
  OPENAI_BASE_URL: "http://127.0.0.1:11434/v1",
  // 填入你的OPENAI模型数组
  models: ["llama3.1:8b", "qwen2:7b"],
  /*
  models: [
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
  ],
  */
  // 在群组中设置唤醒微信机器人的关键词
  groupKey: "",
  // 在私聊中设置唤醒微信机器人的关键词
  privateKey: "",
  // 重置上下文的关键词，如可设置为reset
  resetKey: "reset",
  // 是否在群聊中带上提问的问题
  groupReplyMode: true,
  // 是否在私聊中带上提问的问题
  privateReplyMode: false,
};
