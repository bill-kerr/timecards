import React from 'react';
import { Employee } from '../../store/employees/types';
import { TimecardEmployee } from '../../store/timecard-employees/types';
import { formatDate, toTitleCase } from '../../utils';
import { EmployeeWeekday } from './EmployeeWeekday';

interface EmployeeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  employee: Employee;
  timecardEmployees: TimecardEmployee[];
  weekdays?: Date[];
}

export const EmployeeItem: React.FC<EmployeeItemProps> = ({
  employee,
  timecardEmployees,
  weekdays = [],
  className,
  ...props
}) => {
  return (
    <div className={`flex items-center justify-between py-2 ${className}`} {...props}>
      <div className="w-1/6">{toTitleCase(employee.name)}</div>
      {weekdays.map((date) => (
        <EmployeeWeekday
          key={date.toString()}
          timecardEmployees={timecardEmployees.filter((tcEmployee) => tcEmployee.timecardDate === formatDate(date))}
          className="w-1/12 text-center"
        />
      ))}
      <div className="w-1/12 text-center">40</div>
    </div>
  );
};
