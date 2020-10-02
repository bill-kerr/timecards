import { AsyncAction } from '..';
import { timecardsClient } from '../../apis/timecards';
import { isError } from '../../utils';
import {
  Employee,
  EMPLOYEES_FETCH_COMPLETE,
  EMPLOYEES_FETCH_START,
  EMPLOYEES_UPDATE_COMPLETE,
  EMPLOYEES_UPDATE_START,
  EmployeesFetchCompleteAction,
  EmployeesUpdateCompleteAction,
  EMPLOYEES_FETCH_ERROR,
  EmployeesFetchErrorAction,
  EMPLOYEES_UPDATE_ERROR,
  EmployeesUpdateErrorAction,
} from './types';

export const getEmployees = (): AsyncAction<EmployeesFetchCompleteAction | EmployeesFetchErrorAction> => {
  return async (dispatch) => {
    dispatch({ type: EMPLOYEES_FETCH_START });

    const response = await timecardsClient.getEmployees();
    if (isError(response)) {
      return dispatch({ type: EMPLOYEES_FETCH_ERROR });
    }
    return dispatch({ type: EMPLOYEES_FETCH_COMPLETE, employees: response });
  };
};

export const updateEmployee = (
  id: string,
  employee: Partial<Employee>
): AsyncAction<EmployeesUpdateCompleteAction | EmployeesUpdateErrorAction> => {
  return async (dispatch) => {
    dispatch({ type: EMPLOYEES_UPDATE_START });

    const response = await timecardsClient.updateEmployee(id, employee);
    if (isError(response)) {
      return dispatch({ type: EMPLOYEES_UPDATE_ERROR });
    }

    return dispatch({ type: EMPLOYEES_UPDATE_COMPLETE, employee: response });
  };
};
