import React, { useState } from 'react';
import { Employee } from '../../store/employees/types';
import { TimecardEmployee } from '../../store/timecard-employees/types';
import { Dictionary } from '../../types';
import { getEachDayOfWeek } from '../../utils';
import { EmployeeItem } from './EmployeeItem';

interface EmployeeItemListProps {
  employees: Employee[];
  timecardEmployees: Dictionary<TimecardEmployee[]>;
  weekEnding: Date;
}

export const EmployeeItemList: React.FC<EmployeeItemListProps> = ({ employees, timecardEmployees, weekEnding }) => {
  const [activeEmployee, setActiveEmployee] = useState({});
  console.log('render employee item list');

  return (
    <div>
      {employees.map((em) => (
        <EmployeeItem
          key={em.id}
          employee={em}
          weekdays={getEachDayOfWeek(weekEnding)}
          timecardEmployees={timecardEmployees[em.id] || []}
          active={activeEmployee === em.id}
          onClick={() => setActiveEmployee(em.id)}
        />
      ))}
    </div>
  );
};
