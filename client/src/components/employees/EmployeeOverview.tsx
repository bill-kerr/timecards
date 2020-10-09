import React from 'react';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { setWeekEnding } from '../../store/settings/actions';
import { getEachDayOfWeek, nextWeekEnding, prevWeekEnding } from '../../utils';
import { DateBadge } from '../DateBadge';
import { WeekSelector } from '../WeekSelector';
import { EmployeeItemList } from './EmployeeItemList';

export const EmployeeOverview: React.FC = () => {
  const weekEnding = useTypedSelector((state) => state.settings.weekEnding);
  const loading = useTypedSelector((state) => state.timecardEmployees.loading);
  const settings = useTypedSelector((state) => state.settings);
  const dispatch = useTypedDispatch();

  const onSelectPrevWeek = () => {
    const date = prevWeekEnding(settings.weekEnding);
    dispatch(setWeekEnding(date));
  };

  const onSelectNextWeek = () => {
    const date = nextWeekEnding(settings.weekEnding);
    dispatch(setWeekEnding(date));
  };

  const renderLoading = () => {
    return <div className="">Loading...</div>;
  };

  return (
    <div>
      <WeekSelector
        weekdays={getEachDayOfWeek(settings.weekEnding)}
        onPrevWeek={onSelectPrevWeek}
        onNextWeek={onSelectNextWeek}
      />
      <div
        className="mt-10 py-2 px-6 sticky border-t border-b border-gray-200 bg-white text-gray-600 text-xs uppercase tracking-loose leading-none z-10"
        style={{ top: 0 }}
      >
        <div className="pl-4 flex items-center justify-between">
          <div className="w-1/6 font-bold">Name</div>
          {getEachDayOfWeek(weekEnding).map((date) => (
            <DateBadge date={date} key={date.toString()} className="w-1/12 flex items-center justify-center" />
          ))}
          <div className="font-bold w-1/12 text-center">Total</div>
        </div>
      </div>
      <div className="px-6 py-2">{loading ? renderLoading() : <EmployeeItemList />}</div>
    </div>
  );
};
