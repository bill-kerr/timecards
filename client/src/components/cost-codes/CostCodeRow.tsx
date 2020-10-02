import React from 'react';
import { EmployeeHours } from '../../store/timecard-employees/types';

interface CostCodeRowProps extends React.HTMLAttributes<HTMLDivElement> {
  costCode: string;
  description?: string;
  payClass?: string;
  hours: EmployeeHours[];
  dates: Date[];
}

export const CostCodeRow: React.FC<CostCodeRowProps> = ({ costCode, description = '', payClass = '', ...props }) => {
  return (
    <div {...props}>
      <div className="w-1/5 text-xs">
        <div>
          <span className="font-bold">{costCode}</span>
          <span className="ml-4">{payClass}</span>
        </div>
        <div>{description}</div>
      </div>
    </div>
  );
};
