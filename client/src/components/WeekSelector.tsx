import React from 'react';
import { noop } from '../utils';
import { DateBadge } from './DateBadge';
import { ChevronLeft } from './icons/ChevronLeft';
import { ChevronRight } from './icons/ChevronRight';

interface WeekSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  weekdays: Date[];
  onNextWeek?: () => void;
  onPrevWeek?: () => void;
}

export const WeekSelector: React.FC<WeekSelectorProps> = ({
  weekdays,
  className,
  onNextWeek = noop,
  onPrevWeek = noop,
  ...props
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`} {...props}>
      <ChevronLeft
        className="h-10 w-10 text-gray-500 hover:text-teal-500 cursor-pointer"
        onClick={() => onPrevWeek()}
      />
      <div className="flex items-center justify-center">
        {weekdays.map((date, i) => (
          <DateBadge key={i} date={date} className="ml-2 first:ml-0" />
        ))}
      </div>
      <ChevronRight
        className="h-10 w-10 text-gray-500 hover:text-teal-500 cursor-pointer"
        onClick={() => onNextWeek()}
      />
    </div>
  );
};
