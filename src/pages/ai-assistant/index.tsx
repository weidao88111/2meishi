import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Button from '../../components/ui/Button';
import { getAIResponse, processStream } from '../../services/aiService';

interface Message {
  type: 'user' | 'ai';
  content: string;
  pending?: boolean;
  isError?: boolean;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 滚动到消息底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // 当消息更新时自动滚动
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // 发送消息到AI
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // 添加用户消息
    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInput('');
    
    // 显示AI正在思考
    setIsLoading(true);
    setMessages(prev => [...prev, { type: 'ai', content: '', pending: true }]);
    
    try {
      // 发送请求到AI服务
      const stream = await getAIResponse(userMessage);
      
      if (!stream) {
        throw new Error('无法获取AI响应流');
      }
      
      // 创建一个初始的空AI消息
      let aiResponse = '';
      
      // 更新临时消息为完整的AI消息
      setMessages(prev => {
        const newMessages = [...prev];
        // 替换最后一条消息（应该是pending状态的AI消息）
        newMessages[newMessages.length - 1] = {
          type: 'ai',
          content: aiResponse,
        };
        return newMessages;
      });
      
      // 设置API状态为成功
      setApiStatus('success');
      
      // 处理流式响应
      await processStream(stream, (chunk) => {
        console.log("收到数据:", chunk);
        
        // 忽略空数据和可能的JSON元数据
        if (chunk.trim() === '') return;
        
        // 检查是否为元数据JSON对象，如果是则忽略
        try {
          const jsonObj = JSON.parse(chunk);
          if (typeof jsonObj === 'object' && (jsonObj.p || jsonObj.usage)) {
            console.log('过滤掉元数据:', chunk);
            return; // 忽略包含元数据的JSON对象
          }
        } catch (e) {
          // 不是JSON，继续处理
        }
        
        aiResponse += chunk;
        
        // 每收到一块数据就更新UI
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            type: 'ai',
            content: aiResponse,
          };
          return newMessages;
        });
      });
      
    } catch (error) {
      console.error('AI请求失败:', error);
      
      // 设置API状态为错误
      setApiStatus('error');
      
      // 更新错误消息
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          type: 'ai',
          content: `抱歉，我暂时无法回答您的问题。错误信息: ${error instanceof Error ? error.message : '未知错误'}。
          
请检查网络连接和浏览器控制台以获取更多信息。
您可以尝试刷新页面或稍后再试。`,
          isError: true
        };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // 常见问题示例
  const exampleQuestions = [
    '如何做正宗的麻婆豆腐？',
    '川菜与粤菜有什么区别？',
    '江南菜系的特点是什么？',
    '中国传统节日的代表性食物有哪些？',
    '有哪些适合初学者尝试的中国传统菜肴？'
  ];

  return (
    <>
      <Head>
        <title>AI美食助手 - 中国传统美食博物馆</title>
        <meta 
          name="description" 
          content="使用AI美食助手了解中国传统美食知识，获取烹饪技巧和菜谱建议。" 
        />
      </Head>
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI美食助手</h1>
          <p className="text-gray-600 mb-4">向我询问任何有关中国传统美食的问题，我将为您提供专业解答</p>
          
          {/* API状态提示 */}
          {apiStatus === 'error' && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    无法连接到AI服务
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>当前配置的API URL: {process.env.NEXT_PUBLIC_AI_WORKER_URL}</p>
                    <p className="mt-1">请检查以下几点:</p>
                    <ul className="list-disc pl-5 mt-1">
                      <li>确保您的Cloudflare Worker已正确部署并且可以访问</li>
                      <li>检查Worker是否有CORS配置，允许从您的网站发送请求</li>
                      <li>验证网络连接是否正常</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* 聊天窗口 */}
          <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
            {/* 消息区域 */}
            <div className="h-96 overflow-y-auto p-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.18.066c.927.39 1.902.707 2.907.94a1.454 1.454 0 001.928-.986l.252-1.132c.182-.815-.039-1.669-.6-2.258A13.034 13.034 0 0114.25 3.186m-1.5 0c.251.023.501.05.75.082m-1.5-.082a24.301 24.301 0 00-4.5 0m1.5.082c-.5.038-1.001.085-1.5.139" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">欢迎使用AI美食助手</h3>
                  <p className="mb-4">您可以向我询问关于中国传统美食的问题，例如菜谱、烹饪技巧、食材搭配等。</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}
                  >
                    <div 
                      className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                        message.type === 'user' 
                          ? 'bg-red-600 text-white' 
                          : message.isError
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.pending ? (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      )}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* 输入区域 */}
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="输入您的问题..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={isLoading || !input.trim()}
                  className="rounded-full"
                >
                  {isLoading ? '发送中...' : '发送'}
                </Button>
              </form>
            </div>
          </div>
          
          {/* 问题示例 */}
          {messages.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">您可以尝试这些问题</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="text-left p-3 border border-gray-200 rounded-lg hover:bg-red-50 transition-colors"
                    onClick={() => {
                      setInput(question);
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 