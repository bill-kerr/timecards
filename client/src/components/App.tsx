import React, { useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../store';
import { refreshToken } from '../store/auth/actions';
import { AUTH_REFRESH_ERROR } from '../store/auth/types';
import { EmployeeOverview } from './employees/EmployeeOverview';
import { ForemanOverview } from './foremen/ForemanOverview';
import { HomePage } from './HomePage';
import { SideNav } from './SideNav';
import history from '../history';
import { Login } from './Login';
import { getEmployees } from '../store/employees/actions';
import { getJobs } from '../store/jobs/actions';
import { FullscreenLoading } from './FullscreenLoading';
import { useInterval } from '../hooks/useInterval';
import { TIMECARDS_REFRESH_INTERVAL, TOKEN_REFRESH_INTERVAL } from '../constants';
import { useTimecards } from '../hooks/useTimecards';

export const App: React.FC = () => {
  const dispatch = useTypedDispatch();
  const user = useTypedSelector(state => state.auth.user);

  useInterval(() => dispatch(refreshToken()), TOKEN_REFRESH_INTERVAL * 1000 * 60);

  // Get rid of this. Need to be able to check for existence of cookie.
  useEffect(() => {
    if (user !== null) {
      return;
    }
    dispatch(refreshToken(true)).then(res => {
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

  // useEffect(() => {
  //   if (!user) {
  //     return;
  //   }
  //   const dates = firstAndLastOfWeek(settings.weekEnding);
  //   dispatch(getTimecards(dates));
  //   dispatch(getTimecardEmployees(dates));
  //   dispatch(getTimecardCostCodes(dates));
  // }, [dispatch, settings.weekEnding, user]);

  useTimecards(TIMECARDS_REFRESH_INTERVAL);

  return (
    <div className="h-screen bg-gray-100">
      <Router history={history}>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/">
            {user ? (
              <div className="h-full flex">
                <SideNav user={user} />
                <div className="w-full overflow-y-auto">
                  <Route path="/employee-overview" exact component={EmployeeOverview} />
                  <Route path="/foreman-overview" exact component={ForemanOverview} />
                  <Route path="/" exact component={HomePage} />
                </div>
              </div>
            ) : (
              <FullscreenLoading />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
