import { AsyncAction } from '..';
import { timecardsClient } from '../../apis/timecards';
import { IJobsFetchCompleteAction, JOBS_FETCH_COMPLETE, JOBS_FETCH_START } from './types';

export const getJobs = (): AsyncAction<IJobsFetchCompleteAction> => {
  return async (dispatch) => {
    dispatch({ type: JOBS_FETCH_START });

    const jobs = await timecardsClient.getJobs();
    return dispatch({ type: JOBS_FETCH_COMPLETE, jobs });
  };
};
