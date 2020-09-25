import { AsyncAction } from '..';
import { timecardsClient } from '../../apis/timecards';
import { ITimecardsFetchCompleteAction, TIMECARDS_FETCH_COMPLETE, TIMECARDS_FETCH_START } from './types';

export const getTimecards = (startDate: string, endDate: string): AsyncAction<ITimecardsFetchCompleteAction> => {
  return async (dispatch) => {
    dispatch({ type: TIMECARDS_FETCH_START });

    const timecards = await timecardsClient.getTimecards(startDate, endDate);
    return dispatch({ type: TIMECARDS_FETCH_COMPLETE, timecards });
  };
};
