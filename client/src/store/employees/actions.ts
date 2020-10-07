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
  return async (dispatch, getState) => {
    dispatch({ type: EMPLOYEES_FETCH_START });

    const token = getState().auth.accessToken;
    const response = await timecardsClient(token).getEmployees();
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
  return async (dispatch, getState) => {
    dispatch({ type: EMPLOYEES_UPDATE_START });

    const token = getState().auth.accessToken;
    const response = await timecardsClient(token).updateEmployee(id, employee);
    if (isError(response)) {
      return dispatch({ type: EMPLOYEES_UPDATE_ERROR });
    }

    return dispatch({ type: EMPLOYEES_UPDATE_COMPLETE, employee: response });
  };
};
