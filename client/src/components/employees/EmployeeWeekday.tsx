import React, { useMemo } from 'react';
import { TimecardEmployee } from '../../store/timecard-employees/types';

interface EmployeeWeekdayProps extends React.HTMLAttributes<HTMLDivElement> {
  timecardEmployees: TimecardEmployee[];
}

interface Hours {
  st: number;
  ot: number;
  dt: number;
  stTag: string;
  otTag: string;
  dtTag: string;
}

export const EmployeeWeekday: React.FC<EmployeeWeekdayProps> = ({ timecardEmployees, ...props }) => {
  const hours = useMemo(() => {
    const hours: Hours = { st: 0, ot: 0, dt: 0, stTag: '', otTag: '', dtTag: '' };
    timecardEmployees.forEach((tcEmployee) => {
      tcEmployee.hours.forEach((hourSet) => {
        switch (hourSet.type) {
          case 'regular':
            hours.st += hourSet.hours;
            hours.stTag = hourSet.tagCode;
            return;
          case 'overtime':
            hours.ot += hourSet.hours;
            hours.otTag = hourSet.tagCode;
            return;
          case 'doubletime':
            hours.dt += hourSet.hours;
            hours.dtTag = hourSet.tagCode;
            return;
          default:
            return;
        }
      });
    });
    return hours;
  }, [timecardEmployees]);

  function renderHours() {
    return renderSt() + renderOt() + renderDt();
  }

  function renderSt() {
    return (hours.st === 0 ? '' : hours.st.toString()) + hours.stTag;
  }

  function renderOt() {
    if (hours.ot === 0 && hours.dt !== 0) {
      return '/';
    }
    return (hours.ot === 0 ? '' : '/' + hours.ot.toString()) + hours.otTag;
  }

  function renderDt() {
    return (hours.dt === 0 ? '' : '/' + hours.dt.toString()) + hours.dtTag;
  }

  return <div {...props}>{renderHours()}</div>;
};
