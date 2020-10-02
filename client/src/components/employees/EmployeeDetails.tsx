import React, { useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { updateEmployee } from '../../store/employees/actions';
import { Employee } from '../../store/employees/types';
import { EmployeeHours, TimecardEmployee } from '../../store/timecard-employees/types';
import { getEachDayOfWeek, values } from '../../utils';
import { CostCodeRow } from '../cost-codes/CostCodeRow';
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
  const timecardCostCodes = useTypedSelector((state) => state.timecardCostCodes.timecardCostCodes);
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

  const splitCostCodes = (timecardEmployees: TimecardEmployee[]) => {
    const costCodes: {
      [key: string]: { hours: EmployeeHours[]; date: string; description: string; payClass: string; costCode: string };
    } = {};
    timecardEmployees.forEach((tcEmployee) => {
      tcEmployee.hours.forEach((hours) => {
        const timecardCostCode = timecardCostCodes[hours.timecardCostCodeId];
        if (!timecardCostCode) {
          return;
        }
        if (!(timecardCostCode.code in costCodes)) {
          costCodes[timecardCostCode.code] = {
            costCode: timecardCostCode.code,
            payClass: tcEmployee.payClassCode,
            date: tcEmployee.timecardDate,
            description: timecardCostCode.description,
            hours: [],
          };
        }
        costCodes[timecardCostCode.code].hours.push(hours);
      });
    });
    return costCodes;
  };

  const renderCostCodes = () => {
    const costCodes = splitCostCodes(timecardEmployees);
    return values(costCodes).map((costCode) => (
      <CostCodeRow
        className="mt-2"
        key={costCode.costCode}
        costCode={costCode.costCode}
        hours={costCode.hours}
        description={costCode.description}
        dates={getEachDayOfWeek(weekEnding)}
        payClass={costCode.payClass}
      />
    ));
  };

  return (
    <div className="p-6 mx-20 w-full bg-white rounded-lg shadow">
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
        <div className="w-1/5"></div>
        {getEachDayOfWeek(weekEnding).map((date) => (
          <DateBadge date={date} key={date.toString()} className="w-1/12 flex items-center justify-center" />
        ))}
        <div className="w-1/12 text-sm font-bold">Total</div>
      </div>
      <div className="mt-4">{renderCostCodes()}</div>
    </div>
  );
};
