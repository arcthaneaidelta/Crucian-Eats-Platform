import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'accent';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
}) => {
  const variantStyles = {
    success: 'bg-[#D4EDDA] text-[#2E7D5B] border border-[#2E7D5B]/20',
    warning: 'bg-[#FFF3CD] text-[#B7791F] border border-[#B7791F]/20',
    error: 'bg-[#F8D7DA] text-[#B2402E] border border-[#B2402E]/20',
    info: 'bg-[#D1ECF1] text-[#2F6F8F] border border-[#2F6F8F]/20',
    neutral: 'bg-[#EFE8DA] text-[#4A5753] border border-[#CFC5B0]',
    accent: 'bg-[#F6DDD2] text-[#C65D3B] border border-[#C65D3B]/20',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-[6px]',
    md: 'text-xs px-2.5 py-1 rounded-[6px]',
  };

  return (
    <span className={`inline-flex items-center gap-1 font-semibold tracking-wide font-body select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};
