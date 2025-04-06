import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Button from '../../components/ui/Button';
import { recipes } from '../../data/recipes';
import { foods } from '../../data/foods';

export default function DongpoPorkRecipePage() {
  const router = useRouter();
  
  // 当前选中的步骤
  const [activeStep, setActiveStep] = useState(0);
  // 调整份量的倍数
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  
  // 找到东坡肉菜谱
  const recipe = recipes.find(r => r.id === 'dongpo-pork-recipe');
  
  // 如果菜谱不存在（理论上不会发生）
  if (!recipe) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">菜谱未找到</h1>
        <Button variant="primary" onClick={() => router.push('/recipes')}>
          返回菜谱列表
        </Button>
      </div>
    );
  }
  
  // 找到关联的食物
  const relatedFood = foods.find(food => food.id === recipe.foodId);
  
  // 获取主图片
  const mainImage = '/images/recipes/dongpo-pork-main.jpg';

  return (
    <>
      <Head>
        <title>{recipe.name} - 中国传统美食博物馆</title>
        <meta name="description" content={`学习如何制作正宗的${recipe.name}，详细的步骤指导和专业烹饪技巧。`} />
      </Head>
      
      <div className="container mx-auto py-8 px-4">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-red-600 mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回
        </button>
        
        <div className="bg-soft rounded-lg shadow-md overflow-hidden mb-8">
          <div 
            className="h-80 bg-cover bg-center"
            style={{ backgroundImage: `url(${mainImage})` }}
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.name}</h1>
            
            {relatedFood && (
              <p className="text-gray-600 mb-4">
                传统美食:&nbsp;
                <span 
                  className="text-red-600 cursor-pointer hover:underline"
                  onClick={() => router.push(`/recipes?food=${relatedFood.id}`)}
                >
                  {relatedFood.name}
                </span>
              </p>
            )}
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className={`inline-block text-sm px-3 py-1 rounded-full ${
                recipe.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                recipe.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {recipe.difficulty === 'easy' ? '简单' : 
                 recipe.difficulty === 'medium' ? '中等' : '困难'}
              </span>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                准备时间: {recipe.prepTime}分钟
              </span>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                烹饪时间: {recipe.cookTime}分钟
              </span>
            </div>
          </div>
        </div>
        
        {/* 份量计算器 */}
        <div className="bg-soft rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">调整份量</h2>
          <div className="flex items-center space-x-4">
            <p className="text-gray-700">
              原始份量: <span className="font-medium">{recipe.servings}人份</span>
            </p>
            <div className="flex items-center">
              <button 
                onClick={() => setServingsMultiplier(Math.max(0.5, servingsMultiplier - 0.5))}
                className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center"
              >
                -
              </button>
              <span className="mx-3 font-medium">{recipe.servings * servingsMultiplier}人份</span>
              <button 
                onClick={() => setServingsMultiplier(servingsMultiplier + 0.5)}
                className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        </div>
        
        {/* 食材列表 */}
        <div className="bg-soft rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">食材</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800">{ingredient.name}:</span>
                <span className="ml-2 text-gray-600">
                  {/* 根据份量倍数计算新的食材用量 */}
                  {ingredient.amount.includes('克') || ingredient.amount.includes('毫升') || ingredient.amount.includes('个') || ingredient.amount.includes('根') || ingredient.amount.includes('片') ? 
                    ingredient.amount.replace(/(\d+)/g, (match) => {
                      return Math.round(parseInt(match) * servingsMultiplier).toString();
                    }) : 
                    ingredient.amount
                  }
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* 烹饪步骤 */}
        <div className="bg-soft rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">烹饪步骤</h2>
          
          {/* 步骤导航 */}
          <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
            {recipe.steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep === index ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          {/* 当前步骤 */}
          <div className="mb-6">
            {recipe.steps[activeStep] && (
              <div>
                <h3 className="text-lg font-semibold mb-3">步骤 {activeStep + 1}</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  {recipe.steps[activeStep].image && (
                    <div className="md:w-1/3">
                      <img
                        src={recipe.steps[activeStep].image}
                        alt={`步骤 ${activeStep + 1}`}
                        className="rounded-lg w-full h-auto object-cover"
                      />
                    </div>
                  )}
                  <div className="md:w-2/3">
                    <p className="text-gray-700">{recipe.steps[activeStep].description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* 步骤控制按钮 */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              上一步
            </Button>
            <Button 
              variant="primary" 
              onClick={() => setActiveStep(Math.min(recipe.steps.length - 1, activeStep + 1))}
              disabled={activeStep === recipe.steps.length - 1}
            >
              下一步
            </Button>
          </div>
        </div>
        
        {/* 烹饪技巧 */}
        {recipe.tips && recipe.tips.length > 0 && (
          <div className="bg-soft rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">烹饪技巧</h2>
            <ul className="space-y-3">
              {recipe.tips.map((tip, index) => (
                <li key={index} className="flex">
                  <svg className="w-5 h-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
                  </svg>
                  <p className="text-gray-700">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
} 