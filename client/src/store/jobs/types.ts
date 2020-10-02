export interface Job {
  id: string;
  jobNumber: string;
  descripton: string;
}

export const JOBS_FETCH_START = 'Jobs:FetchStart';
export const JOBS_FETCH_COMPLETE = 'Jobs:FetchComplete';
export const JOBS_FETCH_ERROR = 'Jobs:FetchError';

export interface JobsFetchStartAction {
  type: typeof JOBS_FETCH_START;
}

export interface JobsFetchCompleteAction {
  type: typeof JOBS_FETCH_COMPLETE;
  jobs: Job[];
}

export interface JobsFetchErrorAction {
  type: typeof JOBS_FETCH_ERROR;
}

export type JobsActionTypes = JobsFetchStartAction | JobsFetchCompleteAction | JobsFetchErrorAction;
