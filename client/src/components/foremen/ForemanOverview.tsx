import React from 'react';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { updateEmployee } from '../../store/employees/actions';
import { filterDict, getEachDayOfWeek, values } from '../../utils';
import { ForemanCard } from './ForemanCard';

export const ForemanOverview: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { foremen, timecards, weekdays } = useTypedSelector((state) => {
    const foremen = filterDict(state.employees.employees, (e) => e.isForeman);
    return {
      foremen,
      timecards: filterDict(state.timecards, (t) => t.foremanId in foremen),
      weekdays: getEachDayOfWeek(state.settings.weekEnding),
    };
  });

  return (
    <div className="px-6 flex flex-col sm:flex-row flex-wrap">
      {values(foremen).map((foreman) => (
        <div key={foreman.id} className="sm:mr-6 mt-6 inline-block w-64">
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
  );
};
