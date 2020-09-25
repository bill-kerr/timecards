import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../store';
import { getEmployees } from '../store/employees/actions';
import { values } from '../utils';

export const App: React.FC = () => {
  const dispatch = useTypedDispatch();
  const employees = useTypedSelector((state) => state.employees);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  return (
    <>
      {values(employees).map((employee) => (
        <div key={employee.id}>{employee.name}</div>
      ))}
    </>
  );
};
