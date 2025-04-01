import React from 'react';

type StatusType = 'success' | 'error' | 'warning' | 'info' | 'default';

interface StatusBadgeProps {
  status: StatusType;
  text: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  text,
  className = '',
}) => {
  // 根据状态类型确定样式
  const getBadgeStyles = () => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeStyles()} ${className}`}
    >
      {text}
    </span>
  );
};

export default StatusBadge; 