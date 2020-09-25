export interface Employee {
  id: string;
  name: string;
  isForeman: boolean;
  payClassCode: string;
  payClassDescription: string;
  payClassId: string;
  createdAt: number;
  updatedAt: number;
}

export const EMPLOYEES_FETCH_START = 'Employees:FetchStart';
export const EMPLOYEES_FETCH_COMPLETE = 'Employees:FetchComplete';
export const EMPLOYEES_FETCH_ERROR = 'Employees:FetchError';

export interface IEmployeesFetchStartAction {
  type: typeof EMPLOYEES_FETCH_START;
}

export interface IEmployeesFetchCompleteAction {
  type: typeof EMPLOYEES_FETCH_COMPLETE;
  employees: Employee[];
}

export interface IEmployeesFetchErrorAction {
  type: typeof EMPLOYEES_FETCH_ERROR;
}

export const EMPLOYEES_UPDATE_START = 'Employees:UpdateStart';
export const EMPLOYEES_UPDATE_COMPLETE = 'Employees:UpdateComplete';
export const EMPLOYEES_UPDATE_ERROR = 'Employees:UpdateError';

export interface IEmployeesUpdateStartAction {
  type: typeof EMPLOYEES_UPDATE_START;
}

export interface IEmployeesUpdateCompleteAction {
  type: typeof EMPLOYEES_UPDATE_COMPLETE;
  employee: Employee;
}

export interface IEmployeesUpdateErrorAction {
  type: typeof EMPLOYEES_UPDATE_ERROR;
}

export type EmployeeActionTypes =
  | IEmployeesFetchCompleteAction
  | IEmployeesFetchStartAction
  | IEmployeesFetchErrorAction
  | IEmployeesUpdateStartAction
  | IEmployeesUpdateCompleteAction
  | IEmployeesUpdateErrorAction;
