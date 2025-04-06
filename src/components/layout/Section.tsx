import React, { ReactNode } from 'react';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  background?: 'white' | 'light' | 'gradient' | 'dark';
  withContainer?: boolean;
}

const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  className = '',
  background = 'white',
  withContainer = true
}) => {
  const backgroundClasses = {
    white: 'bg-soft',
    light: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-orange-50 to-red-50',
    dark: 'bg-gray-800 text-white'
  };

  return (
    <section className={`py-16 px-4 my-4 mx-2 rounded-3xl ${backgroundClasses[background]} ${className}`}>
      {withContainer ? (
        <div className="container mx-auto">
          {(title || subtitle) && (
            <div className="text-center max-w-3xl mx-auto mb-12">
              {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
              {subtitle && <p className="text-xl text-gray-600 dark:text-gray-300">{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
      ) : (
        <>
          {(title || subtitle) && (
            <div className="text-center max-w-3xl mx-auto mb-12">
              {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
              {subtitle && <p className="text-xl text-gray-600 dark:text-gray-300">{subtitle}</p>}
            </div>
          )}
          {children}
        </>
      )}
    </section>
  );
};

export default Section; 