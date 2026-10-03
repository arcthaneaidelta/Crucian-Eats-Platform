import React from 'react';
import { Minus, Plus } from 'lucide-react';

export interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export const Stepper: React.FC<StepperProps> = ({
  value,
  onChange,
  min = 0,
  max = 99,
  size = 'md',
}) => {
  const isSmall = size === 'sm';

  return (
    <div className={`inline-flex items-center bg-[#EFE8DA] border border-[#CFC5B0] rounded-[10px] p-0.5 select-none ${isSmall ? 'h-7' : 'h-9'}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (value > min) onChange(value - 1);
        }}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`flex items-center justify-center rounded-[8px] text-[#4A5753] hover:text-[#1D2624] hover:bg-[#FFFDF8] active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none ${isSmall ? 'w-6 h-6' : 'w-8 h-8'}`}
      >
        <Minus className={`${isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
      </button>

      <span className={`text-center font-semibold font-body text-[#1D2624] tabular-nums ${isSmall ? 'w-6 text-xs' : 'w-8 text-sm'}`}>
        {value}
      </span>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (value < max) onChange(value + 1);
        }}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`flex items-center justify-center rounded-[8px] text-[#4A5753] hover:text-[#1D2624] hover:bg-[#FFFDF8] active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none ${isSmall ? 'w-6 h-6' : 'w-8 h-8'}`}
      >
        <Plus className={`${isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
      </button>
    </div>
  );
};
