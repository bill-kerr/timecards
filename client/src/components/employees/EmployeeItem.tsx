import React from 'react';
import { useTypedSelector } from '../../store';
import { Employee } from '../../store/employees/types';
import { formatDate, toTitleCase, values } from '../../utils';

interface EmployeeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  employee: Employee;
  weekdays?: Date[];
}

export const EmployeeItem: React.FC<EmployeeItemProps> = ({ employee, weekdays = [], className, ...props }) => {
  const tcEmployees = useTypedSelector((state) =>
    values(state.timecardEmployees.timecardEmployees, (tcEmployee) => tcEmployee.employeeId === employee.id)
  );

  const renderWeekday = (date: Date) => {
    const formattedDate = formatDate(date);
    let hours = 0;
    tcEmployees.forEach((tcEmployee) => {
      if (tcEmployee.timecardDate === formattedDate) {
        tcEmployee.hours.forEach((timeSet) => {
          hours += timeSet.hours;
        });
      }
    });
    return (
      <div key={formattedDate} className="w-1/12 text-center">
        {hours === 0 ? '' : hours}
      </div>
    );
  };

  return (
    <div className={`flex items-center justify-between py-2 ${className}`} {...props}>
      <div className="w-1/6">{toTitleCase(employee.name)}</div>
      {weekdays.map((date) => renderWeekday(date))}
      <div className="w-1/12 text-center">40</div>
    </div>
  );
};
