import React from 'react';
import { useTypedSelector } from '../../store';
import { getEachDayOfWeek, values } from '../../utils';
import { DateBadge } from '../DateBadge';
import { EmployeeItemList } from './EmployeeItemList';

export const EmployeeOverview: React.FC = () => {
  const state = useTypedSelector((state) => ({
    weekEnding: state.settings.weekEnding,
    employees: values(state.employees.employees, (em) => !!state.timecardEmployees.timecardEmployees[em.id]),
    timecardEmployees: state.timecardEmployees.timecardEmployees,
    loading: state.timecardEmployees.loading,
  }));

  function renderLoading() {
    return (
      <div className="mt-64 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="text-sm pr-4">
      <div
        className="pl-4 pb-2 sticky flex items-center justify-between border-b border-gray-200 bg-white"
        style={{ top: 0 }}
      >
        <div className="w-1/6 font-bold">Name</div>
        {getEachDayOfWeek(state.weekEnding).map((date) => (
          <DateBadge
            date={date}
            showMonth={false}
            key={date.toString()}
            className="w-1/12 flex items-center justify-center"
          />
        ))}
        <div className="font-bold w-1/12 text-center">Total</div>
      </div>
      <div className="mt-2">
        {state.loading ? (
          renderLoading()
        ) : (
          <EmployeeItemList
            timecardEmployees={state.timecardEmployees}
            weekEnding={state.weekEnding}
            employees={state.employees}
          />
        )}
      </div>
    </div>
  );
};
