export default {
  async fetch(request, env, ctx) {
    // 处理CORS预检请求
    if (request.method === 'OPTIONS') {
      return handleCORS(request, {
        allowMethods: ['GET', 'POST'],
        allowHeaders: ['Content-Type'],
        maxAge: 86400, // 24小时缓存预检请求结果
      });
    }
    
    // 只接受 POST 请求
    if (request.method !== 'POST') {
      return new Response('Expected POST request', { 
        status: 405, // 405 Method Not Allowed
        headers: corsHeaders()
      });
    }

    // 尝试解析请求体中的 JSON 数据
    let requestBody;
    try {
      requestBody = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400, // 400 Bad Request
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders()
        },
      });
    }

    // 检查请求体中是否包含有效的 "message" 字段
    if (!requestBody || typeof requestBody.message !== 'string' || requestBody.message.trim() === '') {
      return new Response(JSON.stringify({ error: 'Missing or invalid "message" field in JSON body' }), {
        status: 400, // 400 Bad Request
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders()
        },
      });
    }

    const userMessage = requestBody.message;

    // --- AI 调用 ---
    try {
      // 构建发送给 AI 的消息数组
      const messages = [
        {
          role: "system",
          // 指示 AI 扮演的角色和行为
          content: "你是一位经验丰富、热情友好的 AI 大厨。请用专业且易于理解的方式回答关于烹饪、菜谱、食材、厨房技巧等问题。保持积极和乐于助人的态度。"
        },
        {
          role: "user",
          // 用户发送的实际消息
          content: userMessage
        }
        // 注意：如果需要实现多轮对话，你需要在这里加入之前的对话历史记录。
        // 例如：...historyMessages, { role: "user", content: userMessage }
      ];

      // 调用 AI 模型，启用流式输出
      const streamFromAI = await env.AI.run("@cf/qwen/qwen1.5-14b-chat-awq", {
        stream: true, // 启用流式响应
        max_tokens: 1024, // 稍微增加一点 token 限制，根据需要调整
        messages: messages, // 传入构建好的消息数组
      });

      // 创建一个新的TransformStream来过滤不需要的元数据
      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();
      const reader = streamFromAI.getReader();
      const encoder = new TextEncoder();

      // 处理流式响应
      (async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              await writer.close();
              break;
            }
            
            // 将二进制数据转换为文本
            const text = new TextDecoder().decode(value);
            
            // 检查是否包含 {"response":"","p":...} 或 {"response":"","usage":...} 格式的元数据
            if (text.includes('"response":""') && (text.includes('"p":') || text.includes('"usage":'))) {
              // 跳过这部分元数据，不发送给客户端
              continue;
            }
            
            // 发送有用的内容
            await writer.write(value);
          }
        } catch (e) {
          console.error('流处理错误:', e);
          await writer.abort(e);
        }
      })();

      // 将过滤后的流返回给客户端
      return new Response(readable, {
        headers: {
          "content-type": "text/event-stream", // SSE (Server-Sent Events) 格式
          "X-Content-Type-Options": "nosniff", // 安全标头
          "Cache-Control": "no-cache", // 确保响应不被缓存
          ...corsHeaders() // 添加CORS头
        },
      });

    } catch (e) {
      console.error("AI Error:", e); // 在 Worker 日志中记录错误详情
      return new Response(JSON.stringify({ error: 'Failed to run AI model', details: e.message }), {
        status: 500, // 500 Internal Server Error
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders()
        },
      });
    }
  },
};

// CORS相关函数
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*', // 允许任何来源访问，您可以限制为特定域名
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function handleCORS(request, config = {}) {
  const { allowMethods = ['GET', 'POST'], allowHeaders = ['Content-Type'], maxAge = 86400 } = config;
  
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': allowMethods.join(', '),
      'Access-Control-Allow-Headers': allowHeaders.join(', '),
      'Access-Control-Max-Age': maxAge.toString(),
    },
  });
} 