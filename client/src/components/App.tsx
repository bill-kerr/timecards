import React, { useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../store';
import { refreshToken } from '../store/auth/actions';
import { AUTH_REFRESH_ERROR } from '../store/auth/types';
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
import history from '../history';
import { Login } from './Login';
import { getEmployees } from '../store/employees/actions';
import { getJobs } from '../store/jobs/actions';

export const App: React.FC = () => {
  const dispatch = useTypedDispatch();
  const settings = useTypedSelector((state) => state.settings);
  const user = useTypedSelector((state) => state.auth.user);

  useEffect(() => {
    if (user !== null) {
      return;
    }
    dispatch(refreshToken()).then((res) => {
      if (res.type === AUTH_REFRESH_ERROR) {
        history.push('/login');
        return;
      }
    });
  }, [user, dispatch]);

  useEffect(() => {
    if (!user) {
      return;
    }

    dispatch(getJobs());
    dispatch(getEmployees());
  }, [dispatch, user]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const dates = firstAndLastOfWeek(settings.weekEnding);
    dispatch(getTimecards(dates));
    dispatch(getTimecardEmployees(dates));
    dispatch(getTimecardCostCodes(dates));
  }, [dispatch, settings.weekEnding, user]);

  const onSelectPrevWeek = () => {
    const date = prevWeekEnding(settings.weekEnding);
    dispatch(setWeekEnding(date));
  };

  const onSelectNextWeek = () => {
    const date = nextWeekEnding(settings.weekEnding);
    dispatch(setWeekEnding(date));
  };

  const renderLoading = () => {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  };

  return (
    <div className="h-screen">
      <Router history={history}>
        <Route path="/login" exact component={Login} />
        {!user ? (
          renderLoading()
        ) : (
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
                  <Route path="/employee-overview" exact component={EmployeeOverview} />
                  <Route path="/foreman-overview" exact component={ForemanOverview} />
                  <Route path="/" exact component={HomePage} />
                </Switch>
              </div>
            </div>
          </div>
        )}
      </Router>
    </div>
  );
};
