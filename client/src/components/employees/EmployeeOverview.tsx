import React from 'react';
import { useTypedSelector } from '../../store';
import { getEachDayOfWeek, values } from '../../utils';
import { DateBadge } from '../DateBadge';
import { EmployeeItem } from './EmployeeItem';

export const EmployeeOverview: React.FC = () => {
  const state = useTypedSelector((state) => ({
    timecards: state.timecards,
    weekEnding: state.settings.weekEnding,
    employees: values(state.employees.employees, (em) => state.employees.activeEmployeeIds.includes(em.id)),
    timecardEmployees: state.timecardEmployees.timecardEmployees,
    loading: state.timecardEmployees.loading,
  }));

  function renderEmployees() {
    return state.employees.map((em) => (
      <EmployeeItem
        key={em.id}
        employee={em}
        weekdays={getEachDayOfWeek(state.weekEnding)}
        timecardEmployees={values(state.timecardEmployees, (tcEmployee) => tcEmployee.employeeId === em.id)}
      />
    ));
  }

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
      <div className="mt-2">{state.loading ? renderLoading() : renderEmployees()}</div>
    </div>
  );
};
