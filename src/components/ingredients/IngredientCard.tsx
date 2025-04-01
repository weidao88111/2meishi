import React from 'react';
import Link from 'next/link';
import Card, { CardImage, CardBody } from '../ui/Card';

interface IngredientCardProps {
  id: string;
  name: string;
  englishName: string;
  category: string[];
  imageUrl: string;
  description?: string;
  seasonality?: string[];
}

const IngredientCard: React.FC<IngredientCardProps> = ({
  id,
  name,
  englishName,
  category,
  imageUrl,
  description,
  seasonality,
}) => {
  return (
    <Link href={`/ingredients/${id}`} className="block no-underline text-current">
      <Card hover className="h-full">
        <CardImage 
          src={imageUrl || '/images/ingredients/placeholder.png'} 
          alt={name}
          className="h-40" 
        />
        <CardBody>
          <div className="flex flex-col mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{englishName}</p>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {category.map((cat, index) => (
              <span 
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
          
          {description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
          )}
          
          {seasonality && seasonality.length > 0 && (
            <div className="text-sm text-gray-700">
              <span className="font-medium">最佳季节: </span>
              {seasonality.join(', ')}
            </div>
          )}
        </CardBody>
      </Card>
    </Link>
  );
};

export default IngredientCard; 