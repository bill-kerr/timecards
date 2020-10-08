import React from 'react';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { updateEmployee } from '../../store/employees/actions';
import { setWeekEnding } from '../../store/settings/actions';
import { filterDict, getEachDayOfWeek, nextWeekEnding, prevWeekEnding, values } from '../../utils';
import { IconPlus } from '../icons/IconPlus';
import { IconUserGroup } from '../icons/IconUserGroup';
import { WeekSelector } from '../WeekSelector';
import { ForemanCard } from './ForemanCard';

export const ForemanOverview: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { foremen, timecards, weekdays, settings } = useTypedSelector((state) => {
    const foremen = filterDict(state.employees.employees, (e) => e.isForeman);
    return {
      foremen,
      timecards: filterDict(state.timecards, (t) => t.foremanId in foremen),
      weekdays: getEachDayOfWeek(state.settings.weekEnding),
      settings: state.settings,
    };
  });

  const onSelectPrevWeek = () => {
    const date = prevWeekEnding(settings.weekEnding);
    dispatch(setWeekEnding(date));
  };

  const onSelectNextWeek = () => {
    const date = nextWeekEnding(settings.weekEnding);
    dispatch(setWeekEnding(date));
  };

  const renderNoForemen = () => (
    <div className="mt-10 px-6 flex flex-col items-center justify-center">
      <IconUserGroup className="text-gray-500 h-16 w-16" />
      <span className="mt-1 text-xl text-gray-600 text-center">
        No foremen have been added. Get started by adding some foremen.
      </span>
      <button
        type="submit"
        className="mt-4 p-3 flex items-center justify-center text-center bg-teal-600 text-gray-100 rounded font-bold hover:bg-teal-500 focus:outline-none focus:shadow-outline"
      >
        <IconPlus />
        <span className="ml-2">Add Foremen</span>
      </button>
    </div>
  );

  if (Object.keys(foremen).length === 0) {
    return renderNoForemen();
  }

  return (
    <div>
      <WeekSelector
        weekdays={getEachDayOfWeek(settings.weekEnding)}
        onPrevWeek={onSelectPrevWeek}
        onNextWeek={onSelectNextWeek}
      />
      <div className="mt-10 px-6 flex flex-col sm:flex-row flex-wrap">
        {values(foremen).map((foreman) => (
          <div key={foreman.id} className="sm:mr-6 mb-6 inline-block w-64">
            <ForemanCard
              foreman={foreman}
              timecards={values(timecards, (t) => t.foremanId === foreman.id)}
              weekdays={weekdays}
              className="w-full"
              onRemoveForeman={() => dispatch(updateEmployee(foreman.id, { isForeman: false }))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
