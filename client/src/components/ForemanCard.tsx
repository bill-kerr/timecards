import React from 'react';
import { useTypedSelector } from '../store';
import { Employee } from '../store/employees/types';
import { Timecard } from '../store/timecards/types';
import { formatDate, getEachDayOfWeek } from '../utils';

interface ForemanCardProps {
  foreman: Employee;
  timecards?: Timecard[];
}

export const ForemanCard: React.FC<ForemanCardProps> = ({ foreman, timecards = [] }) => {
  const weekDays = useTypedSelector((state) => getEachDayOfWeek(state.settings.weekEnding));

  const timecardExists = (date: Date) => {
    const formattedDate = formatDate(date);
    return !!timecards.find((tc) => tc.date === formattedDate);
  };

  const weekDayLabel = (day: number) => {
    switch (day) {
      case 0:
      case 6:
        return 'S';
      case 2:
      case 4:
        return 'T';
      case 1:
        return 'M';
      case 3:
        return 'W';
      case 5:
        return 'F';
      default:
        return '';
    }
  };

  return (
    <div className="mt-6 px-4 py-3 first:ml-0 ml-4 w-64 inline-block rounded-lg bg-gray-200 shadow">
      <div className="font-black text-sm uppercase text-gray-800">{foreman.name}</div>
      <div className="mt-2 flex">
        {weekDays.map((day, i) => {
          const bgColor = timecardExists(day) ? 'bg-green-500' : 'bg-gray-500';
          return (
            <div className="ml-2 first:ml-0">
              <div className="text-xs text-center text-gray-600">{weekDayLabel(i)}</div>
              <div className={`h-4 w-4 rounded-sm ${bgColor}`}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
