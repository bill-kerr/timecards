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

export interface IFetchEmployeesStartAction {
  type: typeof EMPLOYEES_FETCH_START;
}

export interface IFetchEmployeesCompleteAction {
  type: typeof EMPLOYEES_FETCH_COMPLETE;
  employees: Employee[];
}

export interface IFetchEmployeesErrorAction {
  type: typeof EMPLOYEES_FETCH_ERROR;
}

export type EmployeeActionTypes =
  | IFetchEmployeesStartAction
  | IFetchEmployeesCompleteAction
  | IFetchEmployeesErrorAction;
