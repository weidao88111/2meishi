/**
 * AI服务 - 处理与Cloudflare Workers的通信
 */

// Worker API 地址 - 从环境变量中获取
const WORKER_URL = process.env.NEXT_PUBLIC_AI_WORKER_URL || 'https://api.meishi.weidaoo.me';

/**
 * 发送消息到AI并获取流式响应
 * @param message 用户消息
 * @returns 流式响应或错误信息
 */
export async function getAIResponse(message: string): Promise<ReadableStream | null> {
  try {
    console.log(`正在连接到AI服务: ${WORKER_URL}`);
    
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify({ message }),
      // 添加以下选项以处理CORS和凭证问题
      mode: 'cors',
      credentials: 'omit',
      cache: 'no-cache',
    });

    console.log(`AI服务响应状态: ${response.status}`);

    if (!response.ok) {
      console.error(`AI响应错误: ${response.status} ${response.statusText}`);
      throw new Error(`AI响应错误: ${response.status}`);
    }

    if (!response.body) {
      console.error('AI响应为空');
      throw new Error('AI响应为空');
    }

    return response.body;
  } catch (error) {
    console.error('AI请求失败:', error);
    throw error;
  }
}

/**
 * 将原始流处理为文本消息
 * @param stream 流式响应
 * @param onChunk 处理每一块数据的回调
 */
export function processStream(
  stream: ReadableStream,
  onChunk: (text: string) => void
): Promise<void> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  
  return new Promise((resolve, reject) => {
    function read() {
      reader.read().then(({ done, value }) => {
        if (done) {
          resolve();
          return;
        }
        
        try {
          const chunk = decoder.decode(value, { stream: true });
          console.log('收到数据块:', chunk);
          
          // 处理SSE格式的数据
          const lines = chunk
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => {
              // 如果是SSE格式数据，提取data部分
              if(line.startsWith('data:')) {
                return line.slice(5).trim();
              }
              return line.trim();
            });
          
          if (lines.length === 0) {
            // 如果没有数据行，不处理
            read();
            return;
          } else {
            for (const line of lines) {
              if (line === '[DONE]') continue;
              
              try {
                // 尝试解析为JSON
                const parsedData = JSON.parse(line);
                
                // 只处理实际的响应文本，忽略元数据
                if (parsedData.response !== undefined) {
                  // Cloudflare AI格式
                  if (parsedData.response !== "") {
                    onChunk(parsedData.response);
                  }
                } else if (parsedData.content) {
                  // ChatGPT格式
                  onChunk(parsedData.content);
                } else if (typeof parsedData === 'string' && parsedData.trim() !== '') {
                  // 字符串格式
                  onChunk(parsedData);
                }
                // 忽略其他所有元数据，不做处理
              } catch (e) {
                // 不是JSON格式，检查是否为纯文本
                if (line.trim() !== '') {
                  onChunk(line);
                }
              }
            }
          }
          
          read();
        } catch (error) {
          console.error('处理数据时出错:', error);
          reject(error);
        }
      }).catch(error => {
        console.error('读取流时出错:', error);
        reject(error);
      });
    }
    
    read();
  });
} 