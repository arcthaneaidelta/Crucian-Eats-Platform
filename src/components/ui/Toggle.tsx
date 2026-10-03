import React from 'react';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  isOnlineVariant?: boolean;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  isOnlineVariant = false,
  disabled = false,
}) => {
  return (
    <label className={`flex items-center justify-between gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-semibold font-body text-[#1D2624] flex items-center gap-2">
              {label}
              {isOnlineVariant && checked && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E7D5B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E7D5B]"></span>
                </span>
              )}
            </span>
          )}
          {description && (
            <span className="text-xs text-[#76817D] font-body">{description}</span>
          )}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-160 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6F6A]
          ${checked
            ? isOnlineVariant ? 'bg-[#2E7D5B]' : 'bg-[#14403F]'
            : 'bg-[#CFC5B0]'
          }
        `}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-160 ease-in-out
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
    </label>
  );
};
