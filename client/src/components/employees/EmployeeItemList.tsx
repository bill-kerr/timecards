import React from 'react';
import { useTypedSelector } from '../../store';
import { getEachDayOfWeek, values } from '../../utils';
import { EmployeeItem } from './EmployeeItem';

export const EmployeeItemList: React.FC = () => {
  const employees = useTypedSelector((state) => state.employees.employees);
  const weekEnding = useTypedSelector((state) => state.settings.weekEnding);
  const timecardEmployees = useTypedSelector((state) => state.timecardEmployees.timecardEmployees);

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
