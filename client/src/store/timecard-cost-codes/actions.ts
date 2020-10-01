import { AsyncAction } from '..';
import { timecardsClient } from '../../apis/timecards';
import { DateRange } from '../../types';
import { formatRange } from '../../utils';
import {
  TimecardCostCodesFetchCompleteAction,
  TIMECARD_COST_CODES_FETCH_COMPLETE,
  TIMECARD_COST_CODES_FETCH_START,
} from './types';

export const getTimecardCostCodes = (dateRange: DateRange): AsyncAction<TimecardCostCodesFetchCompleteAction> => {
  return async (dispatch) => {
    dispatch({ type: TIMECARD_COST_CODES_FETCH_START });
    const timecardCostCodes = await timecardsClient.getTimecardCostCodes(...formatRange(dateRange));

    return dispatch({
      type: TIMECARD_COST_CODES_FETCH_COMPLETE,
      timecardCostCodes,
    });
  };
};
