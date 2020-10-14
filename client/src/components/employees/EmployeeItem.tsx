import React, { useState } from 'react';
import { Employee } from '../../store/employees/types';
import { TimecardEmployee } from '../../store/timecard-employees/types';
import { calcHoursByTimecardEmployees, formatDate, renderHours, toTitleCase } from '../../utils';
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
  className = '',
  ...props
}) => {
  const [totalHours] = useState<Hours>(() => calcHoursByTimecardEmployees(timecardEmployees)[0]);
  const [showModal, setShowModal] = useState(false);

  function renderEmployeeWeekday(date: Date) {
    const tcEmployees = timecardEmployees.filter(
      tcEmployee => tcEmployee.timecardDate === formatDate(date)
    );
    const [hours, tagCodes] = calcHoursByTimecardEmployees(tcEmployees);
    return (
      <EmployeeWeekday
        key={date.toString()}
        className="w-1/12 hidden lg:flex justify-center items-center"
        hours={hours}
        tagCodes={tagCodes}
      />
    );
  }

  return (
    <div
      className={`pl-4 py-2 hover:bg-teal-200 rounded cursor-pointer ${className}`}
      onClick={() => setShowModal(true)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="lg:w-1/6 truncate">
          <span>{toTitleCase(employee.name)}</span>
        </div>
        {weekdays.map(date => renderEmployeeWeekday(date))}
        <div className="lg:w-1/12 pr-4 lg:pr-0 text-center">{renderHours(totalHours)}</div>
      </div>
      {showModal && (
        <Modal onDismiss={() => setShowModal(false)}>
          <EmployeeDetails
            employee={employee}
            timecardEmployees={timecardEmployees}
            dismiss={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};
