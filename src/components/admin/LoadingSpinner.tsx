import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  fullScreen = false,
  text,
  className = ''
}) => {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-2',
    large: 'h-12 w-12 border-4'
  };

  const spinner = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-transparent border-t-indigo-600 ${sizeClasses[size]}`}
      />
      {text && <p className="mt-2 text-sm text-gray-500">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner; 