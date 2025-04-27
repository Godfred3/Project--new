import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantStyles = {
    primary: 'bg-blue-800 text-white hover:bg-blue-700 active:bg-blue-900',
    secondary: 'bg-teal-700 text-white hover:bg-teal-600 active:bg-teal-800',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 active:bg-gray-200',
    ghost: 'bg-transparent hover:bg-gray-100 active:bg-gray-200',
    success: 'bg-green-600 text-white hover:bg-green-500 active:bg-green-700',
    danger: 'bg-red-600 text-white hover:bg-red-500 active:bg-red-700'
  };
  
  const sizeStyles = {
    sm: 'text-sm h-8 px-3',
    md: 'text-sm h-10 px-4',
    lg: 'text-base h-12 px-6'
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;