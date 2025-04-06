import React, { useState, FormEvent } from 'react';

interface ChatBoxProps {
  initialQuestion?: string;
  initialAnswer?: string;
  onAsk: (question: string) => Promise<void>;
  isLoading: boolean;
  hasError: boolean;
  answer: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  initialQuestion = '我想学习做麻婆豆腐，需要哪些材料？',
  initialAnswer = '',
  onAsk,
  isLoading,
  hasError,
  answer,
}) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;
    await onAsk(question);
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-400 flex items-center justify-center shadow-md">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <span className="ml-3 font-semibold text-white">AI美食助手</span>
      </div>
      
      <div className="mb-4 space-y-3">
        <div className="bg-white bg-opacity-20 rounded-2xl rounded-tl-sm p-4 text-white animate-fade-in">
          {initialQuestion}
        </div>
        
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl rounded-tr-sm p-4 text-white shadow-md transform transition-all">
          {hasError ? (
            <span className="text-yellow-200">抱歉，AI助手暂时无法回应。请稍后再试或前往AI助手页面获取帮助。</span>
          ) : (
            <div className={`${isLoading ? 'animate-pulse' : 'animate-fade-in'}`}>
              {answer || initialAnswer}
            </div>
          )}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="relative">
        <input 
          type="text" 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="试着问我关于中国美食的问题..." 
          className="w-full p-4 pr-12 rounded-xl bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-opacity-30 transition-all" 
          disabled={isLoading}
        />
        <button 
          type="submit"
          disabled={isLoading || !question.trim()}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-500 to-orange-400 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md"
        >
          {isLoading ? (
            <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatBox; 