import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { Employee } from '../../store/employees/types';
import { getTimecardEmployees } from '../../store/timecard-employees/actions';
import { firstAndLastOfWeek, isEmptyObj, values } from '../../utils';
import { EmployeeItem } from './EmployeeItem';

export const EmployeeOverview: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { employees, timecards, weekEnding, tcEmployees } = useTypedSelector((state) => ({
    employees: state.employees,
    timecards: state.timecards,
    weekEnding: state.settings.weekEnding,
    tcEmployees: state.timecardEmployees.timecardEmployees,
  }));
  const employeeFilter = (employee: Employee) => {
    for (let tcEmployee of values(tcEmployees)) {
      if (tcEmployee.employeeId === employee.id) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (isEmptyObj(timecards)) {
      return;
    }
    const dates = firstAndLastOfWeek(weekEnding);
    dispatch(getTimecardEmployees(dates));
  }, [dispatch, timecards, weekEnding]);

  return (
    <div className="mt-6">
      {values(employees, employeeFilter).map((employee) => {
        return <EmployeeItem key={employee.id} employee={employee} />;
      })}
    </div>
  );
};
