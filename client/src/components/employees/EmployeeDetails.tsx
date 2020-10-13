import React from 'react';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { updateEmployee } from '../../store/employees/actions';
import { Employee } from '../../store/employees/types';
import { EmployeeHours, TimecardEmployee } from '../../store/timecard-employees/types';
import { CostCodeHours } from '../../types';
import { calcHours, formatDate, getEachDayOfWeek, renderHours, values } from '../../utils';
import { CostCodeRow } from '../cost-codes/CostCodeRow';
import { DateBadge } from '../DateBadge';
import { IconRefresh } from '../icons/IconRefresh';
import { IconUserAdd } from '../icons/IconUserAdd';
import { IconUserRemove } from '../icons/IconUserRemove';
import { IconX } from '../icons/IconX';
import { Tooltip } from '../Tooltip';

interface EmployeeDetailsProps {
  employee: Employee;
  timecardEmployees: TimecardEmployee[];
  dismiss: () => void;
}

export const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({
  employee,
  timecardEmployees,
  dismiss,
}) => {
  const weekEnding = useTypedSelector(state => state.settings.weekEnding);
  const timecardCostCodes = useTypedSelector(state => state.timecardCostCodes.timecardCostCodes);
  const dispatch = useTypedDispatch();
  const loading = useTypedSelector(state => state.employees.loading);

  const handleAddRemoveForeman = async (isForeman: boolean) => {
    await dispatch(updateEmployee(employee.id, { isForeman }));
  };

  const renderAddForeman = () => {
    return (
      <Tooltip content="Add as foreman">
        <IconUserAdd
          className="h-6 w-6 text-teal-300 hover:text-teal-400 cursor-pointer focus:outline-none"
          onClick={() => handleAddRemoveForeman(true)}
        />
      </Tooltip>
    );
  };

  const renderRemoveForeman = () => {
    return (
      <Tooltip content="Remove as foreman">
        <IconUserRemove
          className="h-6 w-6 text-teal-300 hover:text-teal-400 cursor-pointer focus:outline-none"
          onClick={() => handleAddRemoveForeman(false)}
        />
      </Tooltip>
    );
  };

  const renderLoadingIcon = () => {
    return <IconRefresh className="h-6 w-6 text-teal-500 animate-spin-reverse" />;
  };

  const splitCostCodes = (timecardEmployees: TimecardEmployee[]) => {
    const costCodes: {
      [key: string]: {
        hours: CostCodeHours[];
        date: string;
        description: string;
        payClass: string;
        costCode: string;
      };
    } = {};
    timecardEmployees.forEach(tcEmployee => {
      tcEmployee.hours.forEach(hours => {
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
        costCodes[timecardCostCode.code].hours.push({ ...hours, date: tcEmployee.timecardDate });
      });
    });
    return costCodes;
  };

  const getDateHours = (date?: Date) => {
    const tcEmployees = date
      ? timecardEmployees.filter(tcEmployee => tcEmployee.timecardDate === formatDate(date))
      : timecardEmployees;
    const dateHours: EmployeeHours[] = [];
    tcEmployees.forEach(tcEmployee => {
      dateHours.push(...tcEmployee.hours);
    });
    return dateHours;
  };

  const renderCostCodes = () => {
    const costCodes = splitCostCodes(timecardEmployees);
    return values(costCodes).map(costCode => (
      <CostCodeRow
        className="px-6 py-2"
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
    <div className="mx-6 max-w-screen-lg w-full bg-white rounded-lg shadow">
      <div className="p-6 flex items-center justify-between bg-gradient-to-r from-teal-800 to-teal-700 rounded-t-lg text-gray-100">
        <div className="flex items-center">
          <h2 className="text-xl font-black uppercase">{employee.name}</h2>
          <span className="ml-4 px-2 py-1 rounded-full bg-teal-400 text-teal-800 text-xs font-bold">
            {employee.payClassCode}
          </span>
        </div>
        <div className="flex justify-between items-center">
          {loading
            ? renderLoadingIcon()
            : employee.isForeman
            ? renderRemoveForeman()
            : renderAddForeman()}
          <div className="ml-4 pl-2">
            <Tooltip content="Close">
              <IconX
                onClick={dismiss}
                className="h-6 w-6 text-teal-300 hover:text-teal-400 cursor-pointer outline-none"
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="px-6 py-2 flex items-center justify-between font-bold text-xs border-t border-b border-gray-200 bg-gray-100 uppercase text-gray-600 tracking-wide">
        <div className="w-1/5"></div>
        {getEachDayOfWeek(weekEnding).map(date => (
          <DateBadge date={date} key={date.toString()} className="w-1/12" />
        ))}
        <div className="w-1/12 text-center">Total</div>
      </div>
      <div className="py-6">
        {renderCostCodes()}
        <div className="mt-2 border-t border-b border-indigo-200 px-6 py-2 flex items-center justify-between text-sm font-bold bg-indigo-100">
          <div className="w-1/5">Totals</div>
          {getEachDayOfWeek(weekEnding).map(date => {
            const dateHours = getDateHours(date);
            return (
              <div key={date.toString()} className="w-1/12 text-center">
                {renderHours(calcHours(dateHours)[0])}
              </div>
            );
          })}
          <div className="w-1/12 text-center">{renderHours(calcHours(getDateHours())[0])}</div>
        </div>
      </div>
    </div>
  );
};
