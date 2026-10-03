import React from 'react';
import { ShoppingBag, Compass, Clock, UtensilsCrossed, FileText } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: 'bag' | 'compass' | 'clock' | 'food' | 'file';
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'bag',
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  const renderIcon = () => {
    const props = { className: 'w-10 h-10 text-[#2F6F6A] stroke-[1.5]' };
    switch (icon) {
      case 'compass': return <Compass {...props} />;
      case 'clock': return <Clock {...props} />;
      case 'food': return <UtensilsCrossed {...props} />;
      case 'file': return <FileText {...props} />;
      case 'bag':
      default: return <ShoppingBag {...props} />;
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 rounded-[16px] bg-[#FFFDF8] border border-[#E1D9C8] ${className}`}>
      <div className="w-16 h-16 rounded-full bg-[#EFE8DA] flex items-center justify-center mb-4">
        {renderIcon()}
      </div>
      <h4 className="text-base font-semibold font-display text-[#14403F] mb-1">
        {title}
      </h4>
      {description && (
        <p className="text-xs text-[#76817D] font-body max-w-sm mb-4 leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
