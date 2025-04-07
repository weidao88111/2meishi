import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { regions } from '../../data/regions';
import { foods } from '../../data/foods';
import FoodCard from '../../components/features/FoodCard';
import RegionCard from '../../components/features/RegionCard';
import Hero from '../../components/layout/Hero';
import Section from '../../components/layout/Section';
import Button from '../../components/ui/Button';

export default function RegionsPage() {
  // 将食物按地区分组
  const foodsByRegion = regions.reduce((acc, region) => {
    const regionName = region.name.toLowerCase();
    acc[region.id] = foods.filter(food => 
      food.region === regionName || 
      food.region.toLowerCase() === region.englishName.toLowerCase().replace(/ /g, '-')
    );
    return acc;
  }, {} as Record<number, typeof foods>);

  return (
    <>
      <Head>
        <title>地区美食分类 - 中国传统美食博物馆</title>
        <meta name="description" content="探索中国各个地区的特色美食，了解地方饮食文化特点和代表菜品。" />
      </Head>

      {/* 英雄区域 */}
      <Hero
        title="中国八大菜系"
        subtitle="探索中国各地区的特色美食文化，感受不同菜系的独特魅力"
        primaryButtonText="了解菜系特点"
        primaryButtonLink="#cuisine-features"
      />

      {/* 地区菜系 */}
      <div id="cuisine-features">
        <Section
          background="light"
          title="地区美食分类"
          subtitle="中国传统八大菜系，各具特色，各有千秋"
          className="relative"
        >
          {/* 装饰元素 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-100 opacity-30 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100 opacity-30 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 relative z-10">
            {regions.map((region) => (
              <RegionCard
                key={region.id}
                id={region.id}
                name={region.name}
                description={region.description}
                image={region.image}
              />
            ))}
          </div>
        </Section>
      </div>

      {/* 按地区展示美食 */}
      {regions.map((region, index) => (
        <Section
          key={region.id}
          background={index % 2 === 0 ? 'white' : 'gradient'}
          className="region-food-section"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gradient">{region.name}特色美食</h2>
            <Link href={`/regions/${region.id}`} className="text-red-600 hover:text-red-700 font-medium transition-colors flex items-center">
              查看更多
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {foodsByRegion[region.id] && foodsByRegion[region.id].length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {foodsByRegion[region.id].slice(0, 4).map((food) => (
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
          ) : (
            <div className="text-center py-8 bg-white/50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">暂无相关美食数据</h3>
              <p className="text-gray-500 mb-4">我们正在收集{region.name}的特色美食信息</p>
              <Link href={`/regions/${region.id}`}>
                <Button variant="outline" size="md">了解{region.name}特点</Button>
              </Link>
            </div>
          )}
        </Section>
      ))}

      {/* 底部号召性区域 */}
      <Section background="dark">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">开启中华美食文化探索之旅</h2>
          <p className="text-xl text-gray-300 mb-8">
            中国八大菜系各具特色，各有千秋。从北方的鲁菜到南方的粤菜，从东方的苏菜到西方的川菜，每一种菜系都蕴含着深厚的文化底蕴和独特的烹饪技艺。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/recipes">
              <Button variant="primary" size="lg">浏览热门菜谱</Button>
            </Link>
            <Link href="/history">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:bg-opacity-10">
                了解美食历史
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
} 