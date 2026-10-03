import React from 'react';
import { AlertCircle, Check } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, success, startIcon, endIcon, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-[#4A5753] mb-1.5 font-body">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {startIcon && (
            <div className="absolute left-3.5 text-[#76817D] pointer-events-none flex items-center">
              {startIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full bg-[#EFE8DA] text-[#1D2624] placeholder-[#76817D] border rounded-[10px] py-2.5 text-base sm:text-[15px] font-body transition-all duration-150 outline-none
              ${startIcon ? 'pl-10' : 'pl-3.5'}
              ${endIcon || error || success ? 'pr-10' : 'pr-3.5'}
              ${error ? 'border-[#B2402E] focus:ring-2 focus:ring-[#B2402E]/20 bg-[#FFFDF8]' : 'border-[#CFC5B0] focus:border-[#2F6F6A] focus:bg-[#FFFDF8] focus:ring-2 focus:ring-[#2F6F6A]/20'}
              disabled:opacity-60 disabled:cursor-not-allowed
              ${className}
            `}
            {...props}
          />
          {error ? (
            <div className="absolute right-3.5 text-[#B2402E] pointer-events-none">
              <AlertCircle className="w-4 h-4" />
            </div>
          ) : success ? (
            <div className="absolute right-3.5 text-[#2E7D5B] pointer-events-none">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
          ) : endIcon ? (
            <div className="absolute right-3.5 text-[#76817D]">
              {endIcon}
            </div>
          ) : null}
        </div>
        {error ? (
          <p className="mt-1 text-xs text-[#B2402E] flex items-center gap-1 font-body animate-fadeIn">
            {error}
          </p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-[#76817D] font-body">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
