export interface Job {
  id: string;
  jobNumber: string;
  descripton: string;
}

export const JOBS_FETCH_START = 'Jobs:FetchStart';
export const JOBS_FETCH_COMPLETE = 'Jobs:FetchComplete';
export const JOBS_FETCH_ERROR = 'Jobs:FetchError';

export interface IJobsFetchStartAction {
  type: typeof JOBS_FETCH_START;
}

export interface IJobsFetchCompleteAction {
  type: typeof JOBS_FETCH_COMPLETE;
  jobs: Job[];
}

export interface IJobsFetchErrorAction {
  type: typeof JOBS_FETCH_ERROR;
}

export type JobsActionTypes = IJobsFetchStartAction | IJobsFetchCompleteAction | IJobsFetchErrorAction;
