import { AsyncAction } from '..';
import { timecardsClient } from '../../apis/timecards';
import { DateRange } from '../../types';
import { formatRange, isError } from '../../utils';
import {
  TimecardEmployeesFetchCompleteAction,
  TimecardEmployeesFetchErrorAction,
  TIMECARD_EMPLOYEES_FETCH_COMPLETE,
  TIMECARD_EMPLOYEES_FETCH_ERROR,
  TIMECARD_EMPLOYEES_FETCH_START,
} from './types';

export const getTimecardEmployees = (
  dateRange: DateRange
): AsyncAction<TimecardEmployeesFetchCompleteAction | TimecardEmployeesFetchErrorAction> => {
  return async (dispatch) => {
    dispatch({ type: TIMECARD_EMPLOYEES_FETCH_START });

    const response = await timecardsClient.getTimecardEmployees(...formatRange(dateRange));
    if (isError(response)) {
      return dispatch({ type: TIMECARD_EMPLOYEES_FETCH_ERROR });
    }

    return dispatch({
      type: TIMECARD_EMPLOYEES_FETCH_COMPLETE,
      timecardEmployees: response,
    });
  };
};
