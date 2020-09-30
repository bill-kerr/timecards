import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../store';
import { getEmployees } from '../store/employees/actions';
import { getEquipment } from '../store/equipment/actions';
import { getJobs } from '../store/jobs/actions';
import { setWeekEnding } from '../store/settings/actions';
import { getTimecardEmployees } from '../store/timecard-employees/actions';
import { getTimecards } from '../store/timecards/actions';
import { firstAndLastOfWeek, getEachDayOfWeek, nextWeekEnding, prevWeekEnding } from '../utils';
import { EmployeeOverview } from './employees/EmployeeOverview';
import { ForemanOverview } from './foremen/ForemanOverview';
import { Header } from './Header';
import { WeekSelector } from './WeekSelector';

export const App: React.FC = () => {
  const dispatch = useTypedDispatch();
  const settings = useTypedSelector((state) => state.settings);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getJobs());
    dispatch(getEquipment());
  }, [dispatch]);

  useEffect(() => {
    // Extract initial data load to custom hook
    const dates = firstAndLastOfWeek(settings.weekEnding);
    dispatch(getTimecards(dates));
    dispatch(getTimecardEmployees(dates));
  }, [dispatch, settings.weekEnding]);

  const onSelectPrevWeek = () => {
    const date = prevWeekEnding(settings.weekEnding);
    dispatch(setWeekEnding(date));
  };

  const onSelectNextWeek = () => {
    const date = nextWeekEnding(settings.weekEnding);
    dispatch(setWeekEnding(date));
  };

  return (
    <div className="px-6 mx-auto h-screen flex flex-col max-w-screen-xl font-display text-gray-900 antialiased">
      <Router>
        <div className="mt-6">
          <WeekSelector
            weekdays={getEachDayOfWeek(settings.weekEnding)}
            onPrevWeek={onSelectPrevWeek}
            onNextWeek={onSelectNextWeek}
          />
          <div className="mt-8 mb-8">
            <Header />
          </div>
        </div>
        <div className="overflow-y-auto">
          <Switch>
            <Route path="/employee-overview">
              <EmployeeOverview />
            </Route>
            <Route path="/foreman-overview">
              <ForemanOverview />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};
