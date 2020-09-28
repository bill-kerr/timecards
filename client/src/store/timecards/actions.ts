import { AsyncAction } from '..';
import { timecardsClient } from '../../apis/timecards';
import { DateRange } from '../../types';
import { formatRange } from '../../utils';
import {
  TimecardsFetchCompleteAction,
  TIMECARDS_FETCH_COMPLETE,
  TIMECARDS_FETCH_START,
} from './types';

export const getTimecards = (dateRange: DateRange): AsyncAction<TimecardsFetchCompleteAction> => {
  return async (dispatch) => {
    dispatch({ type: TIMECARDS_FETCH_START });

    const timecards = await timecardsClient.getTimecards(...formatRange(dateRange));
    return dispatch({ type: TIMECARDS_FETCH_COMPLETE, timecards });
  };
};
