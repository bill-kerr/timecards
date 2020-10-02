import { AsyncAction } from '..';
import { timecardsClient } from '../../apis/timecards';
import { DateRange } from '../../types';
import { formatRange, isError } from '../../utils';
import {
  TimecardsFetchCompleteAction,
  TimecardsFetchErrorAction,
  TIMECARDS_FETCH_COMPLETE,
  TIMECARDS_FETCH_ERROR,
  TIMECARDS_FETCH_START,
} from './types';

export const getTimecards = (
  dateRange: DateRange
): AsyncAction<TimecardsFetchCompleteAction | TimecardsFetchErrorAction> => {
  return async (dispatch) => {
    dispatch({ type: TIMECARDS_FETCH_START });

    const response = await timecardsClient.getTimecards(...formatRange(dateRange));
    if (isError(response)) {
      return dispatch({ type: TIMECARDS_FETCH_ERROR });
    }

    return dispatch({ type: TIMECARDS_FETCH_COMPLETE, timecards: response });
  };
};
