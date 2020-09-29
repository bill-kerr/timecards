import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { Employee } from '../../store/employees/types';
import { getTimecardEmployees } from '../../store/timecard-employees/actions';
import { firstAndLastOfWeek, getEachDayOfWeek, isEmptyObj, values } from '../../utils';
import { DateBadge } from '../DateBadge';
import { EmployeeItem } from './EmployeeItem';

export const EmployeeOverview: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { employees, timecards, weekEnding, tcEmployees } = useTypedSelector((state) => ({
    employees: state.employees,
    timecards: state.timecards,
    weekEnding: state.settings.weekEnding,
    tcEmployees: state.timecardEmployees.timecardEmployees,
  }));

  useEffect(() => {
    if (isEmptyObj(timecards)) {
      return;
    }
    const dates = firstAndLastOfWeek(weekEnding);
    dispatch(getTimecardEmployees(dates));
  }, [dispatch, timecards, weekEnding]);

  const employeeFilter = (employee: Employee) => {
    for (let tcEmployee of values(tcEmployees)) {
      if (tcEmployee.employeeId === employee.id) {
        return true;
      }
    }
    return false;
  };

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
        {values(employees, employeeFilter).map((employee) => {
          return <EmployeeItem employee={employee} key={employee.id} />;
        })}
      </div>
    </div>
  );
};
