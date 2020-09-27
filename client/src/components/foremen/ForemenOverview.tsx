import React from 'react';
import { useTypedSelector } from '../../store';
import { filterDict, getEachDayOfWeek, values } from '../../utils';
import { ForemanCard } from './ForemanCard';

export const ForemenOverview: React.FC = () => {
  const { foremen, timecards, weekdays } = useTypedSelector((state) => {
    const foremen = filterDict(state.employees, (e) => e.isForeman);
    return {
      foremen,
      timecards: filterDict(state.timecards, (t) => t.foremanId in foremen),
      weekdays: getEachDayOfWeek(state.settings.weekEnding),
    };
  });

  return (
    <div className="flex flex-col">
      {values(foremen).map((foreman) => (
        <div key={foreman.id} className="mt-6">
          <ForemanCard
            foreman={foreman}
            timecards={values(timecards, (t) => t.foremanId === foreman.id)}
            weekdays={weekdays}
          />
        </div>
      ))}
    </div>
  );
};
