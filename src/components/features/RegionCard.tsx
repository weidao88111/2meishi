import React from 'react';
import Link from 'next/link';

interface RegionCardProps {
  id: number | string;
  name: string;
  description: string;
  image: string;
}

const RegionCard: React.FC<RegionCardProps> = ({
  id,
  name,
  description,
  image,
}) => {
  return (
    <Link 
      href={`/regions/${id}`}
      className="block group"
    >
      <div className="relative overflow-hidden rounded-2xl shadow-md h-64 transition-all duration-300 group-hover:shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-10 opacity-80 group-hover:opacity-70 transition-opacity"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transform transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="text-white text-xl font-semibold mb-2 group-hover:mb-3 transition-all">{name}</h3>
          <p className="text-white text-sm opacity-0 group-hover:opacity-90 transition-opacity duration-300 line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default RegionCard; 