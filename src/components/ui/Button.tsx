import React, { useState } from 'react';
import { Loader2, Check } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isSuccess?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isSuccess = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium font-body transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 select-none';
  
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-[10px] gap-1.5 min-h-[32px]',
    md: 'text-[15px] px-4 py-2.5 rounded-[10px] gap-2 min-h-[42px]',
    lg: 'text-base px-6 py-3.5 rounded-[10px] gap-2.5 min-h-[50px]',
  };

  const variantStyles = {
    primary: 'bg-[#14403F] text-[#F7F2E8] hover:bg-[#0F3332] active:bg-[#0B2827] shadow-[0_1px_2px_rgba(29,38,36,0.06)]',
    secondary: 'bg-transparent text-[#1D2624] border border-[#CFC5B0] hover:bg-[#EFE8DA] active:bg-[#E1D9C8]',
    accent: 'bg-[#C65D3B] text-[#FFFDF8] hover:bg-[#AE4D2E] active:bg-[#964024] shadow-[0_1px_2px_rgba(29,38,36,0.08)]',
    ghost: 'bg-transparent text-[#1D2624] hover:bg-[#EFE8DA] hover:text-[#14403F]',
    danger: 'bg-[#B2402E] text-white hover:bg-[#943324]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin stroke-[2]" />
          <span>Processing...</span>
        </>
      ) : isSuccess ? (
        <>
          <Check className="w-4 h-4 stroke-[2.5] text-[#2E7D5B]" />
          <span>Done</span>
        </>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};
