import React from 'react';
import { Hours, TagCodes } from '../../types';
import { renderHours } from '../../utils';

interface EmployeeWeekdayProps extends React.HTMLAttributes<HTMLDivElement> {
  hours: Hours;
  tagCodes: TagCodes;
}

export const EmployeeWeekday: React.FC<EmployeeWeekdayProps> = ({ hours, tagCodes, ...props }) => {
  return <div {...props}>{renderHours(hours, tagCodes)}</div>;
};
