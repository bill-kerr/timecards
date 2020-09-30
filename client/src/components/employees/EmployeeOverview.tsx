import React from 'react';
import { useTypedSelector } from '../../store';
import { getEachDayOfWeek, values } from '../../utils';
import { DateBadge } from '../DateBadge';
import { EmployeeItem } from './EmployeeItem';

export const EmployeeOverview: React.FC = () => {
  const { weekEnding, employees, timecardEmployees } = useTypedSelector((state) => ({
    timecards: state.timecards,
    weekEnding: state.settings.weekEnding,
    employees: values(state.employees.employees, (em) => state.employees.activeEmployeeIds.includes(em.id)),
    timecardEmployees: state.timecardEmployees.timecardEmployees,
  }));

  return (
    <div className="text-sm pr-4">
      <div
        className="pb-2 sticky flex items-center justify-between border-b border-gray-200 bg-white"
        style={{ top: 0 }}
      >
        <div className="w-1/6 font-bold">Name</div>
        {getEachDayOfWeek(weekEnding).map((date) => (
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
        {employees.map((em) => (
          <EmployeeItem
            key={em.id}
            employee={em}
            weekdays={getEachDayOfWeek(weekEnding)}
            timecardEmployees={values(timecardEmployees, (tcEmployee) => tcEmployee.employeeId === em.id)}
          />
        ))}
      </div>
    </div>
  );
};
