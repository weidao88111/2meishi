import React from 'react';
import Link from 'next/link';
import Card, { CardImage, CardBody, CardFooter } from '../ui/Card';

interface RecipeCardProps {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prepTime: number;
  cookTime: number;
  imageUrl: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  name,
  difficulty,
  prepTime,
  cookTime,
  imageUrl,
}) => {
  const difficultyColor = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  const difficultyText = {
    easy: '简单',
    medium: '中等',
    hard: '困难',
  };

  // 如果有main图片则使用main图片
  const mainImageUrl = imageUrl?.replace('step1.png', 'main.jpg') || '/images/recipes/placeholder.png';
  
  // 根据菜谱ID确定链接路径
  let recipeLink = `/recipes/${id}`;
  
  // 为特定菜谱使用专用页面
  if (id === 'mapo-tofu-recipe') {
    recipeLink = '/recipes/mapo-tofu';
  } else if (id === 'dongpo-pork-recipe') {
    recipeLink = '/recipes/dongpo-pork';
  }
  
  return (
    <Link href={recipeLink} className="block no-underline text-current">
      <Card hover className="h-full">
        <CardImage 
          src={mainImageUrl} 
          alt={name}
          className="h-48" 
        />
        <CardBody>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
          
          <div className="flex items-center space-x-2 mb-2">
            <span className={`inline-block ${difficultyColor[difficulty]} text-xs px-2 py-1 rounded-full`}>
              {difficultyText[difficulty]}
            </span>
          </div>
        </CardBody>
        <CardFooter className="flex justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>准备: {prepTime}分钟</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>烹饪: {cookTime}分钟</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard; 