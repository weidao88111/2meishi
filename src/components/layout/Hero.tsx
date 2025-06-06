import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

interface HeroProps {
  title: string;
  subtitle: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}) => {
  return (
    <section className="relative overflow-hidden py-24 px-4 my-4 mx-2">
      {/* Gradient background with rounded corners */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-orange-400 opacity-90 rounded-3xl"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/3 -translate-y-1/3 blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300 opacity-20 rounded-full translate-x-1/3 translate-y-1/3 blur-xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white text-opacity-90 mb-10 leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {primaryButtonText && primaryButtonLink && (
              <Link href={primaryButtonLink}>
                <Button variant="primary" size="lg" className="bg-red-600 text-white hover:bg-red-700 rounded-xl">
                  {primaryButtonText}
                </Button>
              </Link>
            )}
            {secondaryButtonText && secondaryButtonLink && (
              <Link href={secondaryButtonLink}>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-red-100 text-red-700 border-2 border-red-500 hover:bg-red-200 hover:text-red-800 shadow-md font-semibold rounded-xl"
                >
                  {secondaryButtonText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 