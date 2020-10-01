import React, { useState } from 'react';
import { Employee } from '../../store/employees/types';
import { TimecardEmployee } from '../../store/timecard-employees/types';
import { calcHours, formatDate, renderHours, toTitleCase } from '../../utils';
import { EmployeeWeekday } from './EmployeeWeekday';

interface EmployeeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  employee: Employee;
  active: boolean;
  timecardEmployees: TimecardEmployee[];
  weekdays?: Date[];
}

interface Hours {
  st: number;
  ot: number;
  dt: number;
}

export const EmployeeItem: React.FC<EmployeeItemProps> = ({
  employee,
  timecardEmployees,
  weekdays = [],
  className,
  active,
  ...props
}) => {
  const [totalHours] = useState<Hours>({ st: 0, ot: 0, dt: 0 });

  function renderEmployeeWeekday(date: Date) {
    const tcEmployees = timecardEmployees.filter((tcEmployee) => tcEmployee.timecardDate === formatDate(date));
    const [hours, tagCodes] = calcHours(tcEmployees);
    return <EmployeeWeekday key={date.toString()} className="w-1/12 text-center" hours={hours} tagCodes={tagCodes} />;
  }

  function renderDetails() {
    return <div>test</div>;
  }

  return (
    <div
      className={`pl-4 py-2 hover:bg-gray-200 rounded ${
        active ? 'cursor-default bg-teal-200 hover:bg-teal-200' : 'cursor-pointer'
      } ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="w-1/6">
          <span>{toTitleCase(employee.name)}</span>
        </div>
        {weekdays.map((date) => renderEmployeeWeekday(date))}
        <div className="w-1/12 text-center">{renderHours(totalHours)}</div>
      </div>
      {active && renderDetails()}
    </div>
  );
};
