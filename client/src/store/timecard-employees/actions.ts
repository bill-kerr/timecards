import { AsyncAction } from '..';
import { timecardsClient } from '../../apis/timecards';
import { DateRange, Dictionary } from '../../types';
import { formatRange, values } from '../../utils';
import { EMPLOYEES_SET_ACTIVE } from '../employees/types';
import {
  TimecardEmployeesFetchCompleteAction,
  TIMECARD_EMPLOYEES_FETCH_COMPLETE,
  TIMECARD_EMPLOYEES_FETCH_START,
} from './types';

export const getTimecardEmployees = (dateRange: DateRange): AsyncAction<TimecardEmployeesFetchCompleteAction> => {
  return async (dispatch, getState) => {
    dispatch({ type: TIMECARD_EMPLOYEES_FETCH_START });
    const response = timecardsClient.getTimecardEmployees(...formatRange(dateRange));
    const employeeIds: Dictionary<string> = {};
    const timecardEmployees = (await response).map((tcEmployee) => {
      employeeIds[tcEmployee.employeeId] = tcEmployee.employeeId;
      const tc = getState().timecards[tcEmployee.timecardId];
      return {
        ...tcEmployee,
        timecardDate: tc ? tc.date : '',
      };
    });
    dispatch({ type: EMPLOYEES_SET_ACTIVE, employeeIds: values(employeeIds) });

    return dispatch({
      type: TIMECARD_EMPLOYEES_FETCH_COMPLETE,
      timecardEmployees,
    });
  };
};
