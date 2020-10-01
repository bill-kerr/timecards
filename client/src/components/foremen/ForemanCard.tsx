import React, { useState } from 'react';
import { Employee } from '../../store/employees/types';
import { Timecard } from '../../store/timecards/types';
import { formatDate, noop, weekDayLabel } from '../../utils';
import { IconTrash } from '../icons/IconTrash';
import { Tooltip } from '../Tooltip';

interface ForemanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  foreman: Employee;
  weekdays: Date[];
  timecards?: Timecard[];
  onRemoveForeman?: (foreman: Employee) => void;
}

export const ForemanCard: React.FC<ForemanCardProps> = ({
  foreman,
  timecards = [],
  weekdays,
  className,
  onRemoveForeman = noop,
  ...props
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const timecardExists = (date: Date) => {
    const formattedDate = formatDate(date);
    return !!timecards.find((tc) => tc.date === formattedDate);
  };

  return (
    <div
      className={`px-4 py-3 inline-block rounded-lg bg-gray-200 shadow ${className}`}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
      {...props}
    >
      <div className="flex justify-between items-center font-black text-sm uppercase text-gray-800">
        <span>{foreman.name}</span>
        {showMenu && (
          <Tooltip content="Remove as foreman">
            <IconTrash
              className="h-4 w-4 text-gray-600 hover:text-red-600 cursor-pointer focus:outline-none"
              onClick={() => onRemoveForeman(foreman)}
            />
          </Tooltip>
        )}
      </div>
      <div className="mt-2 flex">
        {weekdays.map((day, i) => {
          const bgColor = timecardExists(day) ? 'bg-green-500' : 'bg-gray-500';
          return (
            <div key={i} className="ml-2 first:ml-0">
              <div className="text-xs text-center text-gray-600">{weekDayLabel(i)}</div>
              <div className={`h-4 w-4 rounded-sm shadow-sm ${bgColor}`}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
