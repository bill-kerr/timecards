export interface TimecardEmployee {
  id: string;
  timecardId: string;
  employeeId: string;
  hours: EmployeeHours[];
  timecardDate: string;
}

export interface EmployeeHours {
  id: string;
  hours: number;
  type: 'regular' | 'overtime' | 'doubletime';
  tagCode: string;
  timecardCostCodeId: string;
}

export const TIMECARD_EMPLOYEES_FETCH_START = 'TimecardEmployees:FetchStart';
export const TIMECARD_EMPLOYEES_FETCH_COMPLETE = 'TimecardEmployees:FetchComplete';
export const TIMECARD_EMPLOYEES_FETCH_ERROR = 'TimecardEmployees:FetchError';

export interface TimecardEmployeesFetchStartAction {
  type: typeof TIMECARD_EMPLOYEES_FETCH_START;
}

export interface TimecardEmployeesFetchCompleteAction {
  type: typeof TIMECARD_EMPLOYEES_FETCH_COMPLETE;
  timecardEmployees: TimecardEmployee[];
}

export interface TimecardEmployeesFetchErrorAction {
  type: typeof TIMECARD_EMPLOYEES_FETCH_ERROR;
}

export type TimecardEmployeesActionTypes =
  | TimecardEmployeesFetchStartAction
  | TimecardEmployeesFetchCompleteAction
  | TimecardEmployeesFetchErrorAction;
