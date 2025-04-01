import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  options?: Option[];
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  className = '',
  options = [],
  error,
}) => {
  return (
    <div className={`${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-1">
        {type === 'textarea' ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={3}
            className={`shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md ${
              error ? 'border-red-300' : ''
            }`}
          />
        ) : type === 'select' ? (
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={`shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md ${
              error ? 'border-red-300' : ''
            }`}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={`shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md ${
              error ? 'border-red-300' : ''
            }`}
            min={type === 'number' ? 0 : undefined}
          />
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField; 