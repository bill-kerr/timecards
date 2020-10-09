import React from 'react';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { setWeekEnding } from '../../store/settings/actions';
import { getEachDayOfWeek, nextWeekEnding, prevWeekEnding } from '../../utils';
import { DateBadge } from '../DateBadge';
import { IconRefresh } from '../icons/IconRefresh';
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
    return (
      <div className="mt-10 flex flex-col items-center justify-center">
        <IconRefresh className="w-12 h-12 animate-spin-reverse text-gray-600" />
        <p className="mt-3 text-xl">Loading...</p>
      </div>
    );
  };

  return (
    <div>
      <div className="sticky top-0 z-10 bg-gray-100">
        <WeekSelector
          weekdays={getEachDayOfWeek(settings.weekEnding)}
          onPrevWeek={onSelectPrevWeek}
          onNextWeek={onSelectNextWeek}
        />
        <div
          className="mt-10 py-2 px-6 border-t border-b border-gray-200 bg-white text-gray-600 text-xs uppercase tracking-loose leading-none"
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
      </div>
      <div className="px-6 py-2">{loading ? renderLoading() : <EmployeeItemList />}</div>
    </div>
  );
};
