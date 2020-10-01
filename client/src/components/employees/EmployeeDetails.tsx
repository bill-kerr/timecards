import React, { useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { updateEmployee } from '../../store/employees/actions';
import { Employee } from '../../store/employees/types';
import { TimecardEmployee } from '../../store/timecard-employees/types';
import { getEachDayOfWeek } from '../../utils';
import { DateBadge } from '../DateBadge';
import { IconRefresh } from '../icons/IconRefresh';
import { IconUserAdd } from '../icons/IconUserAdd';
import { IconUserRemove } from '../icons/IconUserRemove';
import { Tooltip } from '../Tooltip';

interface EmployeeDetailsProps {
  employee: Employee;
  timecardEmployees: TimecardEmployee[];
}

export const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ employee, timecardEmployees }) => {
  const weekEnding = useTypedSelector((state) => state.settings.weekEnding);
  const dispatch = useTypedDispatch();
  const [loading, setLoading] = useState(false);

  const handleAddRemoveForeman = async (isForeman: boolean) => {
    setLoading(true);
    await dispatch(updateEmployee(employee.id, { isForeman }));
    setLoading(false);
  };

  const renderAddForeman = () => {
    return (
      <Tooltip content="Add as foreman">
        <IconUserAdd
          className="h-6 w-6 text-gray-600 hover:text-gray-700 cursor-pointer focus:outline-none"
          onClick={() => handleAddRemoveForeman(true)}
        />
      </Tooltip>
    );
  };

  const renderRemoveForeman = () => {
    return (
      <Tooltip content="Remove as foreman">
        <IconUserRemove
          className="h-6 w-6 text-gray-600 hover:text-gray-700 cursor-pointer focus:outline-none"
          onClick={() => handleAddRemoveForeman(false)}
        />
      </Tooltip>
    );
  };

  const renderLoadingIcon = () => {
    return <IconRefresh className="h-6 w-6 text-gray-500 animate-spin" />;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-black uppercase">{employee.name}</h2>
          <span className="ml-4 px-2 py-1 rounded-full bg-teal-100 text-teal-600 text-xs font-bold">
            {employee.payClassCode}
          </span>
        </div>
        <div>{loading ? renderLoadingIcon() : employee.isForeman ? renderRemoveForeman() : renderAddForeman()}</div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        {getEachDayOfWeek(weekEnding).map((date) => (
          <DateBadge date={date} key={date.toString()} className="w-20 flex items-center justify-center" />
        ))}
      </div>
      <div>
        {timecardEmployees.map((tcEmployee) => {
          console.log(tcEmployee);
          return <div></div>;
        })}
      </div>
    </div>
  );
};
