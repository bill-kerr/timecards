export interface Employee {
  id: string;
  name: string;
  isForeman: boolean;
  payClassCode: string;
  payClassDescription: string;
  payClassId: string;
}

export const EMPLOYEES_FETCH_START = 'Employees:FetchStart';
export const EMPLOYEES_FETCH_COMPLETE = 'Employees:FetchComplete';
export const EMPLOYEES_FETCH_ERROR = 'Employees:FetchError';

export interface EmployeesFetchStartAction {
  type: typeof EMPLOYEES_FETCH_START;
}

export interface EmployeesFetchCompleteAction {
  type: typeof EMPLOYEES_FETCH_COMPLETE;
  employees: Employee[];
}

export interface EmployeesFetchErrorAction {
  type: typeof EMPLOYEES_FETCH_ERROR;
}

export const EMPLOYEES_UPDATE_START = 'Employees:UpdateStart';
export const EMPLOYEES_UPDATE_COMPLETE = 'Employees:UpdateComplete';
export const EMPLOYEES_UPDATE_ERROR = 'Employees:UpdateError';

export interface EmployeesUpdateStartAction {
  type: typeof EMPLOYEES_UPDATE_START;
}

export interface EmployeesUpdateCompleteAction {
  type: typeof EMPLOYEES_UPDATE_COMPLETE;
  employee: Employee;
}

export interface EmployeesUpdateErrorAction {
  type: typeof EMPLOYEES_UPDATE_ERROR;
}

export const EMPLOYEES_SET_ACTIVE = 'Employees:SetActive';

export interface EmployeesSetActiveAction {
  type: typeof EMPLOYEES_SET_ACTIVE;
  employeeIds: string[];
}

export type EmployeesActionTypes =
  | EmployeesFetchCompleteAction
  | EmployeesFetchStartAction
  | EmployeesFetchErrorAction
  | EmployeesUpdateStartAction
  | EmployeesUpdateCompleteAction
  | EmployeesUpdateErrorAction
  | EmployeesSetActiveAction;
