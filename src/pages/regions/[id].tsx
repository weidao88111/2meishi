import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { regions } from '../../data/regions';
import { foods } from '../../data/foods';
import Section from '../../components/layout/Section';
import FoodCard from '../../components/features/FoodCard';
import Button from '../../components/ui/Button';

export default function RegionDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  // 找到匹配的地区
  const region = regions.find(r => r.id === Number(id));
  
  // 如果正在加载或者没有找到地区数据，显示加载状态或错误信息
  if (router.isFallback || !region) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }
  
  // 找到属于该地区的食物
  const regionFoods = foods.filter(food => 
    food.region.toLowerCase() === region.name.toLowerCase() || 
    food.region.toLowerCase() === region.englishName.toLowerCase().replace(/ /g, '-')
  );
  
  return (
    <>
      <Head>
        <title>{region.name} - 中国传统美食博物馆</title>
        <meta name="description" content={`探索${region.name}的特色美食，了解${region.cuisine}的特点、代表菜品和烹饪技巧。`} />
      </Head>
      
      {/* 英雄区域 */}
      <div className="relative h-96">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${region.image})` }}
          ></div>
        </div>
        <div className="container mx-auto px-4 h-full relative z-20 flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{region.name}</h1>
            <p className="text-xl text-white opacity-90 mb-4">{region.englishName}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {region.features.map((feature, index) => (
                <span 
                  key={index} 
                  className="inline-block bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded-full text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
            <p className="text-white text-lg mb-8">{region.description}</p>
            <div>
              <Link href="#region-foods">
                <Button variant="gradient" size="lg">
                  探索{region.name}美食
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* 菜系介绍 */}
      <Section 
        background="light"
        title={`${region.cuisine}特点`}
        subtitle="味型特色与烹饪技法"
      >
        <div className="md:flex">
          <div className="md:w-2/3 md:pr-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">菜系特点</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {region.description}
            </p>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4">烹饪技法</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {region.name}注重{region.features.join('、')}等特点，形成了独特的风味和烹饪体系。
              {region.cuisine}的烹饪方法讲究用料新鲜，调味精准，火候掌握得当，形成了色香味俱全的饮食文化特色。
            </p>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4">文化背景</h3>
            <p className="text-gray-700 leading-relaxed">
              {region.name}作为中国传统八大菜系之一，有着深厚的历史文化底蕴。
              其烹饪技艺世代相传，融合了当地的自然环境、物产特点和人文风俗，
              展现了中华饮食文化的多样性和地域特色。
            </p>
          </div>
          
          <div className="md:w-1/3 mt-8 md:mt-0">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4">
                <h3 className="text-xl font-bold text-white">代表菜品</h3>
              </div>
              <div className="px-6 py-4">
                <ul className="space-y-3">
                  {region.famousDishes.map((dish, index) => (
                    <li key={index} className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      <span>{dish}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* 地区美食 */}
      <Section 
        background="white"
        title={`${region.name}特色美食`}
        className="region-foods"
      >
        <div id="region-foods">
          {regionFoods.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regionFoods.map((food) => (
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
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">暂无相关美食数据</h3>
              <p className="text-gray-500 mb-8">我们正在努力完善{region.name}的美食信息</p>
              <Link href="/regions">
                <Button variant="outline">查看其他地区</Button>
              </Link>
            </div>
          )}
        </div>
      </Section>
      
      {/* 推荐其他地区 */}
      <Section
        background="light"
        title="探索其他地区美食"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions
            .filter(r => r.id !== region.id)
            .slice(0, 4)
            .map((otherRegion) => (
              <Link 
                href={`/regions/${otherRegion.id}`}
                key={otherRegion.id}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-xl shadow-md h-48 transition-all duration-300 group-hover:shadow-xl">
                  <div className="absolute inset-0 bg-black opacity-40 z-10 group-hover:opacity-30 transition-opacity"></div>
                  <div 
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url(${otherRegion.image})` }}
                  ></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-white text-xl font-semibold mb-1">{otherRegion.name}</h3>
                    <p className="text-white text-sm opacity-90 line-clamp-2">{otherRegion.englishName}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/regions">
            <Button variant="primary">查看所有地区</Button>
          </Link>
        </div>
      </Section>
    </>
  );
} 