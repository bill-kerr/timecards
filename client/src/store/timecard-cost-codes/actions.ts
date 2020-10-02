import { AsyncAction } from '..';
import { timecardsClient } from '../../apis/timecards';
import { DateRange } from '../../types';
import { formatRange, isError } from '../../utils';
import {
  TimecardCostCodesFetchCompleteAction,
  TimecardCostCodesFetchErrorAction,
  TIMECARD_COST_CODES_FETCH_COMPLETE,
  TIMECARD_COST_CODES_FETCH_ERROR,
  TIMECARD_COST_CODES_FETCH_START,
} from './types';

export const getTimecardCostCodes = (
  dateRange: DateRange
): AsyncAction<TimecardCostCodesFetchCompleteAction | TimecardCostCodesFetchErrorAction> => {
  return async (dispatch) => {
    dispatch({ type: TIMECARD_COST_CODES_FETCH_START });

    const response = await timecardsClient.getTimecardCostCodes(...formatRange(dateRange));
    if (isError(response)) {
      return dispatch({ type: TIMECARD_COST_CODES_FETCH_ERROR });
    }

    return dispatch({
      type: TIMECARD_COST_CODES_FETCH_COMPLETE,
      timecardCostCodes: response,
    });
  };
};
