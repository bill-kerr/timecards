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
  className = '',
  onNextWeek = noop,
  onPrevWeek = noop,
  ...props
}) => {
  return (
    <div className={`pt-6 flex items-center justify-center ${className}`} {...props}>
      <IconChevronLeft
        className="h-10 w-10 lg:h-16 lg:w-16 text-gray-400 hover:text-teal-400 cursor-pointer"
        onClick={() => onPrevWeek()}
      />
      <div className="mx-2 lg:mx-0">
        <h2 className="block text-sm uppercase tracking-wide text-gray-600 text-center font-bold">
          Week Ending{' '}
          <span className="text-teal-500">
            {formatDate(weekdays[weekdays.length - 1], 'MMMM d, yyyy')}
          </span>
        </h2>
        <div className="hidden mt-1 lg:flex items-center justify-center">
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
        className="h-10 w-10 lg:h-16 lg:w-16 text-gray-400 hover:text-teal-400 cursor-pointer"
        onClick={() => onNextWeek()}
      />
    </div>
  );
};
