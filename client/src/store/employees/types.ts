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

export const FETCH_EMPLOYEES_START = 'Employees:FetchStart';
export const FETCH_EMPLOYEES_COMPLETE = 'Employees:FetchComplete';

export interface IFetchEmployeesStartAction {
  type: typeof FETCH_EMPLOYEES_START;
}

export interface IFetchEmployeesCompleteAction {
  type: typeof FETCH_EMPLOYEES_COMPLETE;
  employees: Employee[];
}

export type EmployeeActionTypes = IFetchEmployeesStartAction | IFetchEmployeesCompleteAction;
