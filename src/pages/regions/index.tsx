import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { regions } from '../../data/regions';
import { foods } from '../../data/foods';
import FoodCard from '../../components/features/FoodCard';

export default function RegionsPage() {
  // 将食物按地区分组
  const foodsByRegion = regions.reduce((acc, region) => {
    acc[region.id] = foods.filter(food => food.region === region.name.toLowerCase());
    return acc;
  }, {} as Record<string, typeof foods>);

  return (
    <>
      <Head>
        <title>地区美食分类 - 中国传统美食博物馆</title>
        <meta name="description" content="探索中国各个地区的特色美食，了解地方饮食文化特点和代表菜品。" />
      </Head>

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">中国地区美食</h1>
        <p className="text-gray-600 mb-8">探索中国八大菜系和各地区特色美食文化</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {regions.map((region) => (
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
                  <div className="flex flex-wrap gap-1 mb-2">
                    {region.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="inline-block bg-red-600 bg-opacity-70 text-white text-xs px-2 py-0.5 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <p className="text-white text-sm opacity-90 line-clamp-2">{region.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 展示按地区分类的美食 */}
        {regions.map((region) => (
          <div key={region.id} className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-3"></span>
                {region.name}美食
              </h2>
              <Link href={`/regions/${region.id}`} className="text-red-600 hover:text-red-700">
                查看更多 &rarr;
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
              <p className="text-gray-500 italic">暂无相关美食数据</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
} 