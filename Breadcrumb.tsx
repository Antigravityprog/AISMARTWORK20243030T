import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-xs md:text-sm text-slate-500 mb-6 py-2 overflow-x-auto" aria-label="Breadcrumb">
      <Link 
        to="/" 
        className="flex items-center hover:text-cyan-600 transition-colors shrink-0"
        title="홈으로 이동"
      >
        <Home className="w-3.5 h-3.5 mr-1 text-slate-400" />
        <span>Home</span>
      </Link>
      
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400 shrink-0" />
          {item.path ? (
            <Link 
              to={item.path} 
              className="hover:text-cyan-600 transition-colors shrink-0 font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 font-semibold truncate shrink-0 max-w-[240px] md:max-w-none">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
