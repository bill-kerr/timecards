import { Dictionary } from '../../types';
import { mapKeys } from '../../utils';
import { Job, JobsActionTypes, JOBS_FETCH_COMPLETE } from './types';

const initialState: Dictionary<Job> = {};

export const jobsReducer = (state = initialState, action: JobsActionTypes): Dictionary<Job> => {
  switch (action.type) {
    case JOBS_FETCH_COMPLETE:
      return { ...state, ...mapKeys(action.jobs) };
    default:
      return state;
  }
};
