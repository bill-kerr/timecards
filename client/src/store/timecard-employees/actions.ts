import { AsyncAction } from '..';
import {
  TimecardEmployee,
  TimecardEmployeesFetchCompleteAction,
  TIMECARD_EMPLOYEES_FETCH_COMPLETE,
  TIMECARD_EMPLOYEES_FETCH_START,
} from './types';

export const getTimecardEmployees = (): AsyncAction<TimecardEmployeesFetchCompleteAction> => {
  return async (dispatch) => {
    dispatch({ type: TIMECARD_EMPLOYEES_FETCH_START });

    const timecardEmployees: TimecardEmployee[] = [];

    return dispatch({ type: TIMECARD_EMPLOYEES_FETCH_COMPLETE, timecardEmployees });
  };
};
