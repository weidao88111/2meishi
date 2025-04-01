import React, { ReactNode } from 'react';

interface ActionButtonProps {
  onClick?: () => void;
  icon?: ReactNode;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  onClick, 
  icon, 
  children, 
  variant = 'primary',
  className = '',
  type = 'button'
}) => {
  const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-md text-white transition-colors duration-200";
  
  const variantClasses = {
    primary: "bg-red-600 hover:bg-red-700",
    secondary: "bg-blue-600 hover:bg-blue-700",
    danger: "bg-red-500 hover:bg-red-600"
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default ActionButton; 