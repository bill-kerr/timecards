import React from 'react';
import { formatDate, noop } from '../utils';
import { DateBadge } from './DateBadge';
import { IconChevronLeft } from './icons/IconChevronLeft';
import { IconChevronRight } from './icons/IconChevronRight';

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
    <div className={`mt-6 flex items-center justify-center ${className}`} {...props}>
      <IconChevronLeft
        className="h-16 w-16 text-gray-400 hover:text-teal-400 cursor-pointer"
        onClick={() => onPrevWeek()}
      />
      <div>
        <h2 className="block text-sm uppercase tracking-wide text-gray-600 text-center font-bold">
          Week Ending {formatDate(weekdays[weekdays.length - 1], 'MMMM d, yyyy')}
        </h2>
        <div className="mt-1 flex items-center justify-center">
          {weekdays.map((date, i) => (
            <DateBadge
              key={i}
              date={date}
              className="ml-2 py-2 px-3 w-16 first:ml-0 rounded border border-gray-200 bg-white"
            />
          ))}
        </div>
      </div>
      <IconChevronRight
        className="h-16 w-16 text-gray-400 hover:text-teal-400 cursor-pointer"
        onClick={() => onNextWeek()}
      />
    </div>
  );
};
