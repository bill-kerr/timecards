import React, { useMemo } from 'react';
import { Hours, TagCodes } from '../../types';
import { renderHours } from '../../utils';

interface EmployeeWeekdayProps extends React.HTMLAttributes<HTMLDivElement> {
  hours: Hours;
  tagCodes: TagCodes;
}

export const EmployeeWeekday: React.FC<EmployeeWeekdayProps> = ({
  hours,
  tagCodes,
  className,
  ...props
}) => {
  const problem = useMemo(() => hours.st > 8, [hours]);

  return (
    <div className={`relative flex items-center ${className}`} {...props}>
      {problem && <div className="h-2 w-2 rounded-full bg-red-500"></div>}
      {renderHours(hours, tagCodes)}
    </div>
  );
};
