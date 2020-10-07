import React from 'react';
import { useTypedSelector } from '../../store';
import { getEachDayOfWeek, values } from '../../utils';
import { IconUserGroup } from '../icons/IconUserGroup';
import { EmployeeItem } from './EmployeeItem';

export const EmployeeItemList: React.FC = () => {
  const employees = useTypedSelector((state) => state.employees.employees);
  const weekEnding = useTypedSelector((state) => state.settings.weekEnding);
  const timecardEmployees = useTypedSelector((state) => state.timecardEmployees.timecardEmployees);

  const renderNoEmployees = () => (
    <div className="mt-10 px-6 flex flex-col items-center justify-center">
      <IconUserGroup className="text-gray-500 h-16 w-16" />
      <span className="mt-1 text-xl text-gray-600 text-center">
        No timecard data has been submitted for this week.
      </span>
    </div>
  );

  if (Object.keys(timecardEmployees).length === 0) {
    return renderNoEmployees();
  }

  return (
    <div>
      {values(employees, (employee) => !!timecardEmployees[employee.id]).map((employee) => (
        <EmployeeItem
          key={employee.id}
          employee={employee}
          weekdays={getEachDayOfWeek(weekEnding)}
          timecardEmployees={timecardEmployees[employee.id] || []}
        />
      ))}
    </div>
  );
};
