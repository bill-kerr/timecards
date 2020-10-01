import { AsyncAction } from '..';
import { timecardsClient } from '../../apis/timecards';
import { DateRange } from '../../types';
import { formatRange } from '../../utils';
import {
  TimecardEmployeesFetchCompleteAction,
  TIMECARD_EMPLOYEES_FETCH_COMPLETE,
  TIMECARD_EMPLOYEES_FETCH_START,
} from './types';

export const getTimecardEmployees = (dateRange: DateRange): AsyncAction<TimecardEmployeesFetchCompleteAction> => {
  return async (dispatch) => {
    dispatch({ type: TIMECARD_EMPLOYEES_FETCH_START });
    const timecardEmployees = await timecardsClient.getTimecardEmployees(...formatRange(dateRange));

    return dispatch({
      type: TIMECARD_EMPLOYEES_FETCH_COMPLETE,
      timecardEmployees,
    });
  };
};
