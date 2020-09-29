import { AsyncAction } from '..';
import { timecardsClient } from '../../apis/timecards';
import {
  Employee,
  EMPLOYEES_FETCH_COMPLETE,
  EMPLOYEES_FETCH_START,
  EMPLOYEES_UPDATE_COMPLETE,
  EMPLOYEES_UPDATE_START,
  EmployeesFetchCompleteAction,
  EmployeesUpdateCompleteAction,
} from './types';

export const getEmployees = (): AsyncAction<EmployeesFetchCompleteAction> => {
  return async (dispatch) => {
    dispatch({ type: EMPLOYEES_FETCH_START });

    const employees = await timecardsClient.getEmployees();
    return dispatch({ type: EMPLOYEES_FETCH_COMPLETE, employees });
  };
};

export const updateEmployee = (id: string, employee: Partial<Employee>): AsyncAction<EmployeesUpdateCompleteAction> => {
  return async (dispatch) => {
    dispatch({ type: EMPLOYEES_UPDATE_START });

    const updatedEmployee = await timecardsClient.updateEmployee(id, employee);
    return dispatch({ type: EMPLOYEES_UPDATE_COMPLETE, employee: updatedEmployee });
  };
};
