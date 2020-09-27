import React from 'react';
import { formatDate } from '../utils';

interface DateBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
}

export const DateBadge: React.FC<DateBadgeProps> = ({ date, className, ...props }) => {
  return (
    <div className={`flex flex-col items-center leading-tight ${className}`} {...props}>
      <div className="text-xs text-gray-600 font-bold tracking-wide uppercase">
        {formatDate(date, 'EEE')}
      </div>
      <div className="font-black text-gray-700">{formatDate(date, 'd')}</div>
      <div className="text-xs text-gray-600 font-bold tracking-wide uppercase">
        {formatDate(date, 'MMM')}
      </div>
    </div>
  );
};
