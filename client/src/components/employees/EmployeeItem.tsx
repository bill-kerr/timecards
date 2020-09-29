import React from 'react';
import { Employee } from '../../store/employees/types';
import { formatDate, toTitleCase } from '../../utils';

interface EmployeeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  employee: Employee;
  weekdays?: Date[];
}

export const EmployeeItem: React.FC<EmployeeItemProps> = ({ employee, weekdays = [], className, ...props }) => {
  const renderWeekday = (date: Date) => {
    const formattedDate = formatDate(date);
    return <div className="w-1/12 text-center">{formattedDate}</div>;
  };

  return (
    <div className={`flex items-center justify-between py-2 ${className}`} {...props}>
      <div className="w-1/6">{toTitleCase(employee.name)}</div>
      {weekdays.map((date) => renderWeekday(date))}
      <div className="w-1/12 text-center">40</div>
    </div>
  );
};
