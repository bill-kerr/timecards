export interface Timecard {
  id: string;
  jobId: string;
  foremanId: string;
  date: string;
  revision: number;
  isApproved: boolean;
  isReviewed: boolean;
  isAccepted: boolean;
  isRejected: boolean;
  sentToPayrollRevision: number;
  lastModifiedDateTime: string;
}

export const TIMECARDS_FETCH_START = 'Timecards:FetchStart';
export const TIMECARDS_FETCH_COMPLETE = 'Timecards:FetchComplete';
export const TIMECARDS_FETCH_ERROR = 'Timecards:FetchError';

export interface TimecardsFetchStartAction {
  type: typeof TIMECARDS_FETCH_START;
}

export interface TimecardsFetchCompleteAction {
  type: typeof TIMECARDS_FETCH_COMPLETE;
  timecards: Timecard[];
}

export interface TimecardsFetchErrorAction {
  type: typeof TIMECARDS_FETCH_ERROR;
}

export type TimecardsActionTypes = TimecardsFetchStartAction | TimecardsFetchCompleteAction | TimecardsFetchErrorAction;
