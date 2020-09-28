import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../store';
import { getEmployees } from '../store/employees/actions';
import { getEquipment } from '../store/equipment/actions';
import { getJobs } from '../store/jobs/actions';
import { setWeekEnding } from '../store/settings/actions';
import { getTimecards } from '../store/timecards/actions';
import { firstAndLastOfWeek, getEachDayOfWeek, nextWeekEnding, prevWeekEnding } from '../utils';
import { EmployeeOverview } from './employees/EmployeeOverview';
import { ForemanOverview } from './foremen/ForemanOverview';
import { Header } from './Header';
import { WeekSelector } from './WeekSelector';

export const App: React.FC = () => {
  const dispatch = useTypedDispatch();
  const weekEnding = useTypedSelector((state) => state.settings.weekEnding);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getJobs());
    dispatch(getEquipment());
  }, [dispatch]);

  useEffect(() => {
    // Extract initial data load to custom hook
    const dates = firstAndLastOfWeek(weekEnding);
    dispatch(getTimecards(dates));
  }, [dispatch, weekEnding]);

  const onSelectPrevWeek = () => {
    const date = prevWeekEnding(weekEnding);
    dispatch(setWeekEnding(date));
  };

  const onSelectNextWeek = () => {
    const date = nextWeekEnding(weekEnding);
    dispatch(setWeekEnding(date));
  };

  return (
    <div className="px-6 mx-auto max-w-screen-xl font-display text-gray-900 antialiased">
      <Router>
        <div className="mt-6">
          <WeekSelector
            weekdays={getEachDayOfWeek(weekEnding)}
            onPrevWeek={onSelectPrevWeek}
            onNextWeek={onSelectNextWeek}
          />
        </div>
        <div className="mt-3">
          <Header />
        </div>
        <div>
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
