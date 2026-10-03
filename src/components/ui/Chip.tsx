import React from 'react';
import { Check } from 'lucide-react';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  count?: number;
  className?: string;
  icon?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onClick,
  count,
  className = '',
  icon,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-medium font-body transition-all duration-150 select-none whitespace-nowrap active:scale-95
        ${selected
          ? 'bg-[#14403F] text-[#F7F2E8] shadow-sm'
          : 'bg-[#EFE8DA] text-[#4A5753] hover:bg-[#E1D9C8] hover:text-[#1D2624] border border-[#CFC5B0]/50'
        }
        ${className}
      `}
    >
      {selected ? (
        <Check className="w-3 h-3 stroke-[2.5]" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      <span>{label}</span>
      {count !== undefined && (
        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${selected ? 'bg-white/20 text-white' : 'bg-black/10 text-[#4A5753]'}`}>
          {count}
        </span>
      )}
    </button>
  );
};
