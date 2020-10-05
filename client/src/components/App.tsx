import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../store';
import { getEmployees } from '../store/employees/actions';
import { getEquipment } from '../store/equipment/actions';
import { getJobs } from '../store/jobs/actions';
import { setWeekEnding } from '../store/settings/actions';
import { getTimecardCostCodes } from '../store/timecard-cost-codes/actions';
import { getTimecardEmployees } from '../store/timecard-employees/actions';
import { getTimecards } from '../store/timecards/actions';
import { firstAndLastOfWeek, getEachDayOfWeek, nextWeekEnding, prevWeekEnding } from '../utils';
import { EmployeeOverview } from './employees/EmployeeOverview';
import { ForemanOverview } from './foremen/ForemanOverview';
import { HomePage } from './HomePage';
import { SideNav } from './SideNav';
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
    dispatch(getTimecardCostCodes(dates));
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
    <div className="h-screen">
      <Router>
        <div className="h-full flex">
          <SideNav />
          <div className="w-full flex flex-col">
            <div>
              <WeekSelector
                weekdays={getEachDayOfWeek(settings.weekEnding)}
                onPrevWeek={onSelectPrevWeek}
                onNextWeek={onSelectNextWeek}
              />
            </div>
            <div className="mt-10 overflow-y-auto">
              <Switch>
                <Route path="/employee-overview" exact>
                  <EmployeeOverview />
                </Route>
                <Route path="/foreman-overview" exact>
                  <ForemanOverview />
                </Route>
                <Route path="/" exact>
                  <HomePage />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
};
