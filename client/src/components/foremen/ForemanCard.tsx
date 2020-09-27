import React from 'react';
import { Employee } from '../../store/employees/types';
import { Timecard } from '../../store/timecards/types';
import { formatDate, weekDayLabel } from '../../utils';

interface ForemanCardProps {
  foreman: Employee;
  weekdays: Date[];
  timecards?: Timecard[];
}

export const ForemanCard: React.FC<ForemanCardProps> = ({ foreman, timecards = [], weekdays }) => {
  const timecardExists = (date: Date) => {
    const formattedDate = formatDate(date);
    return !!timecards.find((tc) => tc.date === formattedDate);
  };

  return (
    <div className="px-4 py-3 w-64 inline-block rounded-lg bg-gray-200 shadow">
      <div className="font-black text-sm uppercase text-gray-800">{foreman.name}</div>
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
