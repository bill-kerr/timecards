import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { getTimecardEmployees } from '../../store/timecard-employees/actions';
import { isEmptyObj, values } from '../../utils';

export const EmployeeOverview: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { employees, timecards } = useTypedSelector((state) => ({
    employees: state.employees,
    timecards: state.timecards,
  }));
  const employeeFilter = () => true;

  useEffect(() => {
    if (isEmptyObj(timecards)) {
      return;
    }
    dispatch(getTimecardEmployees());
  }, [dispatch, timecards]);

  return (
    <div className="mt-6">
      {values(employees, employeeFilter).map((employee) => {
        return <div key={employee.id}>{employee.name}</div>;
      })}
    </div>
  );
};
