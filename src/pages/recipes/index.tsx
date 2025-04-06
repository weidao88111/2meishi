import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import RecipeCard from '../../components/recipes/RecipeCard';
import Button from '../../components/ui/Button';
import { recipes } from '../../data/recipes';
import { foods } from '../../data/foods';

export default function RecipesPage() {
  const router = useRouter();
  const { food: foodId } = router.query;
  
  // 筛选条件状态
  const [difficulty, setDifficulty] = useState<string>('all');
  const [prepTime, setPrepTime] = useState<string>('all');
  
  // 根据URL参数筛选食物相关菜谱
  let filteredRecipes = recipes;
  
  if (foodId && typeof foodId === 'string') {
    filteredRecipes = recipes.filter(recipe => recipe.foodId === foodId);
    
    // 找到对应的食物
    const relatedFood = foods.find(food => food.id === foodId);
    
    if (relatedFood) {
      return (
        <>
          <Head>
            <title>{relatedFood.name}的菜谱 - 中国传统美食博物馆</title>
            <meta name="description" content={`学习如何制作正宗的${relatedFood.name}，详细步骤和专业技巧。`} />
          </Head>
          
          <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
              <button 
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-red-600 mb-4"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回
              </button>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{relatedFood.name}的菜谱</h1>
              <p className="text-gray-600 mb-6">{relatedFood.englishName}</p>
              
              <div className="bg-soft rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">关于{relatedFood.name}</h2>
                <p className="text-gray-700 mb-4">{relatedFood.description}</p>
                <p className="text-gray-700">{relatedFood.history}</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">相关菜谱</h2>
            
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    name={recipe.name}
                    difficulty={recipe.difficulty}
                    prepTime={recipe.prepTime}
                    cookTime={recipe.cookTime}
                    imageUrl={recipe.steps[0]?.image || '/images/recipes/placeholder.png'}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">暂无相关菜谱</p>
                <Button variant="primary" onClick={() => router.push('/recipes')}>
                  浏览所有菜谱
                </Button>
              </div>
            )}
          </div>
        </>
      );
    }
  }
  
  // 应用筛选条件
  if (difficulty !== 'all') {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.difficulty === difficulty);
  }
  
  if (prepTime !== 'all') {
    if (prepTime === 'quick') {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.prepTime + recipe.cookTime <= 30);
    } else if (prepTime === 'medium') {
      filteredRecipes = filteredRecipes.filter(recipe => {
        const totalTime = recipe.prepTime + recipe.cookTime;
        return totalTime > 30 && totalTime <= 60;
      });
    } else if (prepTime === 'long') {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.prepTime + recipe.cookTime > 60);
    }
  }
  
  return (
    <>
      <Head>
        <title>菜谱中心 - 中国传统美食博物馆</title>
        <meta name="description" content="探索中国传统美食的制作方法，学习正宗的中国菜谱，从简单家常菜到复杂的传统名菜。" />
      </Head>
      
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">菜谱中心</h1>
        <p className="text-gray-600 mb-8">探索中国传统美食的制作方法，学习地道的烹饪技巧</p>
        
        {/* 筛选区域 */}
        <div className="bg-soft rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">筛选菜谱</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">难度</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">全部难度</option>
                <option value="easy">简单</option>
                <option value="medium">中等</option>
                <option value="hard">困难</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">准备时间</label>
              <select
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">全部时间</option>
                <option value="quick">快速 (30分钟以内)</option>
                <option value="medium">适中 (30-60分钟)</option>
                <option value="long">耗时 (60分钟以上)</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* 菜谱列表 */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                name={recipe.name}
                difficulty={recipe.difficulty}
                prepTime={recipe.prepTime}
                cookTime={recipe.cookTime}
                imageUrl={recipe.steps[0]?.image || '/images/recipes/placeholder.png'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">没有找到符合条件的菜谱</p>
            <Button variant="primary" onClick={() => {
              setDifficulty('all');
              setPrepTime('all');
            }}>
              重置筛选条件
            </Button>
          </div>
        )}
      </div>
    </>
  );
} 