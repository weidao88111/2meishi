import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import FoodCard from '../components/features/FoodCard';
import Button from '../components/ui/Button';
import { foods } from '../data/foods';
import { regions } from '../data/regions';
import { getAIResponse, processStream } from '../services/aiService';

export default function Home() {
  // 展示部分食物作为推荐
  const featuredFoods = foods.slice(0, 3);
  
  // 添加AI助手相关状态
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('麻婆豆腐需要以下材料：嫩豆腐、牛肉末、郫县豆瓣酱、花椒粉、辣椒油、生抽、料酒、蒜末、姜末、葱花、水淀粉和食用油。您需要了解详细的制作步骤吗？');
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  
  // 处理AI助手提问
  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim() || isLoading) return;
    
    setIsLoading(true);
    setShowError(false);
    
    try {
      // 发送请求到AI服务
      const stream = await getAIResponse(question);
      
      if (!stream) {
        throw new Error('无法获取AI响应流');
      }
      
      // 创建一个初始的空AI消息
      let aiResponse = '';
      
      // 处理流式响应
      await processStream(stream, (chunk) => {
        aiResponse += chunk;
        setAnswer(aiResponse);
      });
      
    } catch (error) {
      console.error('AI请求失败:', error);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Head>
        <title>中国传统美食博物馆 - 探索中华美食文化</title>
        <meta name="description" content="探索中国传统美食文化，了解各地区特色美食的历史与制作工艺，体验中华饮食文化的魅力。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 英雄区域 */}
      <section className="relative bg-gradient-to-r from-red-700 to-red-500 text-white py-24 px-4">
        <div className="container mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">中国传统美食博物馆</h1>
          <p className="text-xl md:text-2xl text-center mb-8 max-w-3xl">
            探索中华五千年美食文化，品味舌尖上的中国
          </p>
          <div className="flex space-x-4">
            <Link href="/regions">
              <Button variant="outline" size="lg">探索地区美食</Button>
            </Link>
            <Link href="/recipes">
              <Button variant="secondary" size="lg">浏览菜谱</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 精选美食 */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">精选美食</h2>
            <Link href="/recipes" className="text-red-600 hover:text-red-700">
              查看全部 &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFoods.map((food) => (
              <FoodCard
                key={food.id}
                id={food.id}
                name={food.name}
                englishName={food.englishName}
                region={food.region}
                description={food.description}
                imageUrl={food.images[0]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 地区美食 */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">探索地区美食</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.slice(0, 4).map((region) => (
              <Link 
                href={`/regions/${region.id}`}
                key={region.id}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-md h-60">
                  <div className="absolute inset-0 bg-black opacity-40 z-10 group-hover:opacity-30 transition-opacity"></div>
                  <div 
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url(${region.image})` }}
                  ></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-white text-xl font-semibold mb-1">{region.name}</h3>
                    <p className="text-white text-sm opacity-90 line-clamp-2">{region.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/regions">
              <Button variant="primary" size="lg">查看所有地区</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI助手区域 */}
      <section className="py-16 px-4 bg-gray-800 text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl font-bold mb-4">AI美食助手</h2>
            <p className="text-lg mb-6">
              不知道吃什么？想了解某道菜的做法？我们的AI助手可以帮助你解答关于中国美食的各种问题，并为你提供个性化的推荐。
            </p>
            <Link href="/ai-assistant">
              <Button variant="outline" size="lg">立即体验</Button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <span className="ml-3 font-semibold">AI助手</span>
              </div>
              <div className="mb-4">
                <div className="bg-gray-600 rounded-lg p-3 mb-3">
                  我想学习做麻婆豆腐，需要哪些材料？
                </div>
                <div className="bg-red-600 rounded-lg p-3">
                  {showError ? (
                    <span className="text-yellow-200">抱歉，AI助手暂时无法回应。请稍后再试或前往AI助手页面获取帮助。</span>
                  ) : (
                    answer
                  )}
                </div>
              </div>
              <form onSubmit={handleAskAI} className="relative">
                <input 
                  type="text" 
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="试着问我关于中国美食的问题..." 
                  className="w-full p-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={isLoading || !question.trim()}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 disabled:text-gray-500 disabled:cursor-not-allowed"
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
          </div>
        </div>
      </section>
    </>
  );
}
