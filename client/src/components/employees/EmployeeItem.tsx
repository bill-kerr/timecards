import React, { useState } from 'react';
import { Employee } from '../../store/employees/types';
import { TimecardEmployee } from '../../store/timecard-employees/types';
import { calcHours, formatDate, renderHours, toTitleCase } from '../../utils';
import { Modal } from '../Modal';
import { EmployeeDetails } from './EmployeeDetails';
import { EmployeeWeekday } from './EmployeeWeekday';

interface EmployeeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  employee: Employee;
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
  ...props
}) => {
  const [totalHours] = useState<Hours>(() => calcHours(timecardEmployees)[0]);
  const [showModal, setShowModal] = useState(false);

  function renderEmployeeWeekday(date: Date) {
    const tcEmployees = timecardEmployees.filter((tcEmployee) => tcEmployee.timecardDate === formatDate(date));
    const [hours, tagCodes] = calcHours(tcEmployees);
    return <EmployeeWeekday key={date.toString()} className="w-1/12 text-center" hours={hours} tagCodes={tagCodes} />;
  }

  return (
    <div
      className={`pl-4 py-2 hover:bg-teal-200 rounded cursor-pointer ${className}`}
      onClick={() => setShowModal(true)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="w-1/6">
          <span>{toTitleCase(employee.name)}</span>
        </div>
        {weekdays.map((date) => renderEmployeeWeekday(date))}
        <div className="w-1/12 text-center">{renderHours(totalHours)}</div>
      </div>
      {showModal && (
        <Modal onDismiss={() => setShowModal(false)}>
          <EmployeeDetails employee={employee} timecardEmployees={timecardEmployees} />
        </Modal>
      )}
    </div>
  );
};
