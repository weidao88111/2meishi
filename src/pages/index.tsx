import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import FoodCard from '../components/features/FoodCard';
import RegionCard from '../components/features/RegionCard';
import Button from '../components/ui/Button';
import Hero from '../components/layout/Hero';
import Section from '../components/layout/Section';
import ChatBox from '../components/ai/ChatBox';
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
  const handleAskAI = async (question: string) => {
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
      <Hero 
        title="中国传统美食博物馆"
        subtitle="探索中华五千年美食文化，品味舌尖上的中国"
        primaryButtonText="探索地区美食"
        primaryButtonLink="/regions"
        secondaryButtonText="浏览菜谱"
        secondaryButtonLink="/recipes"
      />

      {/* 精选美食 */}
      <Section 
        title="精选美食"
        background="white"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gradient">精选美食</h2>
          <Link href="/recipes" className="text-red-600 hover:text-red-700 font-medium transition-colors">
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
      </Section>

      {/* 地区美食 */}
      <Section 
        background="gradient"
        title="探索地区美食"
        subtitle="中国八大菜系，各具特色，满足您的味蕾探索"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.slice(0, 4).map((region) => (
            <RegionCard
              key={region.id}
              id={region.id}
              name={region.name}
              description={region.description}
              image={region.image}
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/regions">
            <Button variant="primary" size="lg" className="bg-red-600 text-white hover:bg-red-700">查看所有地区</Button>
          </Link>
        </div>
      </Section>

      {/* AI助手区域 */}
      <Section background="dark" className="relative overflow-hidden">
        {/* 装饰元素 */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-800 opacity-20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500 opacity-10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h2 className="text-3xl font-bold mb-4 text-white">AI美食助手</h2>
            <p className="text-lg mb-6 text-gray-300">
              不知道吃什么？想了解某道菜的做法？我们的AI助手可以帮助你解答关于中国美食的各种问题，并为你提供个性化的推荐。
            </p>
            <Link href="/ai-assistant">
              <Button variant="outline" size="lg" className="bg-red-500 bg-opacity-80 border-white text-white hover:bg-red-600 hover:bg-opacity-90">
                立即体验
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <ChatBox
              initialAnswer={answer}
              onAsk={handleAskAI}
              isLoading={isLoading}
              hasError={showError}
              answer={answer}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
