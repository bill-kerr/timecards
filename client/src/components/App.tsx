import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../store';
import { getEmployees, updateEmployee } from '../store/employees/actions';
import { Employee } from '../store/employees/types';
import { values } from '../utils';

export const App: React.FC = () => {
  const dispatch = useTypedDispatch();
  const employees = useTypedSelector((state) => state.employees);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

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
