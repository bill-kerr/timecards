import { AsyncAction } from '..';
import { timecardsClient } from '../../apis/timecards';
import { EMPLOYEES_FETCH_COMPLETE, EMPLOYEES_FETCH_START, IFetchEmployeesCompleteAction } from './types';

export const getEmployees = (): AsyncAction<IFetchEmployeesCompleteAction> => {
  return async (dispatch) => {
    dispatch({ type: EMPLOYEES_FETCH_START });

    const employees = await timecardsClient.getEmployees();
    return dispatch({ type: EMPLOYEES_FETCH_COMPLETE, employees });
  };
};
