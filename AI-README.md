# AI美食助手功能配置指南

中国传统美食博物馆网站包含一个AI美食助手功能，可以回答关于中国传统美食的各种问题。此文档将指导您如何配置和使用这一功能。

## 技术架构

AI美食助手功能采用以下架构：

1. 前端：Next.js应用中的聊天界面
2. 后端：Cloudflare Workers上运行的API服务
3. AI模型：Cloudflare AI平台上的Qwen 1.5模型

## 配置步骤

### 1. Cloudflare Worker配置

Worker代码已经提供，您需要将其部署到您的Cloudflare账户：

1. 登录您的[Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 导航至**Workers & Pages**
3. 点击**创建应用程序**
4. 选择**创建Worker**
5. 在编辑器中粘贴提供的Worker代码
6. 点击**部署**
7. 复制生成的Worker URL（格式为`https://your-worker-name.your-account.workers.dev`）

### 2. 网站环境变量配置

1. 在项目根目录创建`.env.local`文件（您可以复制`.env.local.example`）
2. 设置`NEXT_PUBLIC_AI_WORKER_URL`为您的Worker URL：

```
NEXT_PUBLIC_AI_WORKER_URL=https://your-worker-name.your-account.workers.dev
```

3. 重启Next.js开发服务器或重新构建项目以应用更改

## 使用方法

配置完成后，您可以通过以下方式使用AI美食助手：

1. 在网站导航栏点击**AI美食助手**菜单项
2. 在打开的聊天界面中，输入您关于中国传统美食的问题
3. 等待AI回复您的问题

### 示例问题

您可以尝试以下类型的问题：

- "如何做正宗的麻婆豆腐？"
- "川菜与粤菜有什么区别？"
- "江南菜系的特点是什么？"
- "中国传统节日的代表性食物有哪些？"
- "有哪些适合初学者尝试的中国传统菜肴？"

## 故障排除

如果AI助手功能不工作，请检查以下几点：

1. 确保Cloudflare Worker已正确部署并且可以访问
2. 验证`.env.local`文件中的URL是否正确
3. 检查浏览器控制台中是否有任何错误消息
4. 确保您的网络连接正常

## 注意事项

- AI回复基于Qwen 1.5模型生成，可能不总是100%准确
- 处理每个请求可能会消耗Cloudflare Workers的配额
- 如果您的网站流量很大，请考虑调整Cloudflare Workers的计划 