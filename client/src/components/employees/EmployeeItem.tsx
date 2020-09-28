import React from 'react';
import { Employee } from '../../store/employees/types';
import { toTitleCase } from '../../utils';

interface EmployeeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  employee: Employee;
}

export const EmployeeItem: React.FC<EmployeeItemProps> = ({ employee, className, ...props }) => {
  return (
    <div className={`py-2 ${className}`} {...props}>
      {toTitleCase(employee.name)}
    </div>
  );
};
