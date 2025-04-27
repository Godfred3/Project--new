import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverable = false }) => {
  const hoverClass = hoverable 
    ? 'hover:shadow-lg transition-shadow duration-300 cursor-pointer' 
    : '';
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${hoverClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 bg-gray-50 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CardImage: React.FC<CardImageProps> = ({ src, alt, className = '' }) => (
  <div className={`w-full ${className}`}>
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);

export { Card, CardHeader, CardContent, CardFooter, CardImage };