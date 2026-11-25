import React from 'react';

interface DemoBadgeProps {
  label?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({ 
  label = 'DEMO', 
  className = '', 
  size = 'sm' 
}) => {
  const sizeClasses = size === 'sm' 
    ? 'text-[10px] px-2 py-0.5' 
    : 'text-xs px-2.5 py-1';

  return (
    <span 
      className={`inline-flex items-center font-semibold tracking-wider uppercase rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/25 ${sizeClasses} ${className}`}
      title="This item contains illustrative demo data"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse"></span>
      {label}
    </span>
  );
};
