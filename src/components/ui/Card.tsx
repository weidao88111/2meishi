import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  const hoverClass = hover ? 'transform transition duration-300 hover:shadow-xl hover:-translate-y-2' : '';
  
  return (
    <div className={`bg-soft rounded-2xl shadow-sm overflow-hidden ${hoverClass} ${className} transition-all duration-300`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return <div className={`px-6 py-5 ${className}`}>{children}</div>;
};

export const CardBody: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return <div className={`px-6 py-5 ${className}`}>{children}</div>;
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