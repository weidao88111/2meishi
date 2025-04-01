import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: string;
  className?: string;
}

const SelectFilter: React.FC<SelectFilterProps> = ({
  value,
  onChange,
  options,
  label,
  className = '',
}) => {
  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter; 