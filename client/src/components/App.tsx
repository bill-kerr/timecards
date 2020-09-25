import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../store';
import { getEmployees, updateEmployee } from '../store/employees/actions';
import { Employee } from '../store/employees/types';
import { getEquipment } from '../store/equipment/actions';
import { getJobs } from '../store/jobs/actions';
import { getTimecards } from '../store/timecards/actions';
import { values } from '../utils';

export const App: React.FC = () => {
  const dispatch = useTypedDispatch();
  const employees = useTypedSelector((state) => state.employees);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getTimecards('2020-09-01', '2020-09-25'));
    dispatch(getJobs());
    dispatch(getEquipment());
  }, [dispatch]);

  const handleClick = (employee: Employee) => {
    dispatch(updateEmployee(employee.id, { isForeman: !employee.isForeman }));
  };

  return (
    <>
      {values(employees).map((employee) => (
        <div
          key={employee.id}
          style={{ fontWeight: employee.isForeman ? 'bold' : 'normal' }}
          onClick={() => handleClick(employee)}
        >
          {employee.name}
        </div>
      ))}
    </>
  );
};
