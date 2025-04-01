import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  const hoverClass = hover ? 'transform transition duration-300 hover:shadow-lg hover:-translate-y-1' : '';
  
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
};

export const CardBody: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return <div className={`px-6 py-4 bg-gray-50 ${className}`}>{children}</div>;
};

export const CardImage: React.FC<{ 
  src: string; 
  alt: string;
  className?: string;
}> = ({ src, alt, className = '' }) => {
  return (
    <div className="w-full">
      <img 
        src={src} 
        alt={alt}
        className={`w-full object-cover ${className}`}
      />
    </div>
  );
};

export default Card; 