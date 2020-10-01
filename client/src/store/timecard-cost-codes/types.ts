export interface TimecardCostCode {
  id: string;
  timecardId: string;
  code: string;
  description: string;
  quantity: number;
  unit: string;
}

export const TIMECARD_COST_CODES_FETCH_START = 'TimecardCostCodes:FetchStart';
export const TIMECARD_COST_CODES_FETCH_COMPLETE = 'TimecardCostCodes:FetchComplete';
export const TIMECARD_COST_CODES_FETCH_ERROR = 'TimecardCostCodes:FetchError';

export interface TimecardCostCodesFetchStartAction {
  type: typeof TIMECARD_COST_CODES_FETCH_START;
}

export interface TimecardCostCodesFetchCompleteAction {
  type: typeof TIMECARD_COST_CODES_FETCH_COMPLETE;
  timecardCostCodes: TimecardCostCode[];
}

export interface TimecardCostCodesFetchErrorAction {
  type: typeof TIMECARD_COST_CODES_FETCH_ERROR;
}

export type TimecardCostCodesActionTypes =
  | TimecardCostCodesFetchStartAction
  | TimecardCostCodesFetchCompleteAction
  | TimecardCostCodesFetchErrorAction;
