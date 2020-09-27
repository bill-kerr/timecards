import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../store';
import { getEmployees } from '../store/employees/actions';
import { getEquipment } from '../store/equipment/actions';
import { getJobs } from '../store/jobs/actions';
import { getTimecards } from '../store/timecards/actions';
import { firstDayOfWeek, formatDate, getEachDayOfWeek } from '../utils';
import { ForemenOverview } from './foremen/ForemenOverview';
import { Header } from './Header';
import { WeekSelector } from './WeekSelector';

export const App: React.FC = () => {
  const dispatch = useTypedDispatch();
  const weekEnding = useTypedSelector((state) => state.settings.weekEnding);

  const onPrevWeek = () => {};

  useEffect(() => {
    // Extract initial data load to custom hook
    dispatch(getEmployees());
    dispatch(getTimecards(formatDate(firstDayOfWeek(weekEnding)), formatDate(weekEnding)));
    dispatch(getJobs());
    dispatch(getEquipment());
  }, [dispatch, weekEnding]);

  return (
    <div className="px-6 mx-auto max-w-screen-xl font-display">
      <div className="mt-6">
        <WeekSelector weekdays={getEachDayOfWeek(weekEnding)} onPrevWeek={onPrevWeek} />
      </div>
      <div className="mt-3">
        <Header />
      </div>
      <div>
        <ForemenOverview />
      </div>
    </div>
  );
};
