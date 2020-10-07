import { AsyncAction } from '..';
import { timecardsClient } from '../../apis/timecards';
import { isError } from '../../utils';
import {
  JobsFetchCompleteAction,
  JobsFetchErrorAction,
  JOBS_FETCH_COMPLETE,
  JOBS_FETCH_ERROR,
  JOBS_FETCH_START,
} from './types';

export const getJobs = (): AsyncAction<JobsFetchCompleteAction | JobsFetchErrorAction> => {
  return async (dispatch, getState) => {
    dispatch({ type: JOBS_FETCH_START });

    const token = getState().auth.accessToken;
    const response = await timecardsClient(token).getJobs();
    if (isError(response)) {
      return dispatch({ type: JOBS_FETCH_ERROR });
    }

    return dispatch({ type: JOBS_FETCH_COMPLETE, jobs: response });
  };
};
