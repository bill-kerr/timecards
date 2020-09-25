import React from 'react';
import { Employee } from '../store/employees/types';
import { Timecard } from '../store/timecards/types';

interface ForemanCardProps {
  foreman: Employee;
  timecards?: Timecard[];
}

export const ForemanCard: React.FC<ForemanCardProps> = ({ foreman, timecards = [] }) => {
  return (
    <>
      <div>{foreman.name}</div>
      {timecards.map((tc) => (
        <span style={{ marginLeft: '1rem', marginRight: '1rem' }}>{tc.date}</span>
      ))}
    </>
  );
};
