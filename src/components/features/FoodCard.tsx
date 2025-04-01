import React from 'react';
import Link from 'next/link';
import Card, { CardImage, CardBody } from '../ui/Card';

interface FoodCardProps {
  id: string;
  name: string;
  englishName: string;
  region: string;
  description: string;
  imageUrl: string;
}

const FoodCard: React.FC<FoodCardProps> = ({
  id,
  name,
  englishName,
  region,
  description,
  imageUrl,
}) => {
  return (
    <Link href={`/recipes?food=${id}`} className="block no-underline text-current">
      <Card hover className="h-full">
        <CardImage 
          src={imageUrl || '/images/foods/placeholder.png'} 
          alt={name}
          className="h-48" 
        />
        <CardBody>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
              {region}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-2">{englishName}</p>
          <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
        </CardBody>
      </Card>
    </Link>
  );
};

export default FoodCard; 