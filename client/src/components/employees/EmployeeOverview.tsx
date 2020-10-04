import React from 'react';
import { useTypedSelector } from '../../store';
import { getEachDayOfWeek } from '../../utils';
import { DateBadge } from '../DateBadge';
import { EmployeeItemList } from './EmployeeItemList';

export const EmployeeOverview: React.FC = () => {
  const weekEnding = useTypedSelector((state) => state.settings.weekEnding);
  const loading = useTypedSelector((state) => state.timecardEmployees.loading);

  function renderLoading() {
    return <div className="">Loading...</div>;
  }

  return (
    <div className="text-sm">
      <div
        className="py-2 px-6 sticky  bg-gray-100 border-t border-b border-gray-200 text-gray-600 text-xs uppercase tracking-loose leading-none"
        style={{ top: 0 }}
      >
        <div className="pl-4 flex items-center justify-between">
          <div className="w-1/6 font-bold">Name</div>
          {getEachDayOfWeek(weekEnding).map((date) => (
            <DateBadge
              date={date}
              key={date.toString()}
              className="w-1/12 flex items-center justify-center"
            />
          ))}
          <div className="font-bold w-1/12 text-center">Total</div>
        </div>
      </div>
      <div className="px-6 py-2">{loading ? renderLoading() : <EmployeeItemList />}</div>
    </div>
  );
};
