import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../store';
import { getEmployees } from '../store/employees/actions';
import { getEquipment } from '../store/equipment/actions';
import { getJobs } from '../store/jobs/actions';
import { getTimecards } from '../store/timecards/actions';
import { formatDate, getEachDayOfWeek } from '../utils';
import { ForemenOverview } from './foremen/ForemenOverview';
import { Header } from './Header';
import { WeekSelector } from './WeekSelector';

export const App: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { startDate, endDate, weekdays } = useTypedSelector((state) => {
    return {
      startDate: state.settings.timecardDateRange.startDate,
      endDate: state.settings.timecardDateRange.endDate,
      weekdays: getEachDayOfWeek(state.settings.weekEnding),
    };
  });

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getTimecards(formatDate(startDate), formatDate(endDate)));
    dispatch(getJobs());
    dispatch(getEquipment());
  }, [dispatch, startDate, endDate]);

  return (
    <div className="px-6 mx-auto max-w-screen-xl font-display">
      <div className="">
        <WeekSelector weekdays={weekdays} />
      </div>
      <div>
        <Header />
      </div>
      <div>
        <ForemenOverview />
      </div>
    </div>
  );
};
