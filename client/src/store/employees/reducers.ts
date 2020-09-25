import { Dictionary } from '../../types';
import { mapKeys } from '../../utils';
import { Employee, EmployeeActionTypes, EMPLOYEES_FETCH_COMPLETE } from './types';

const initialState: Dictionary<Employee> = {};

export const employeeReducer = (state = initialState, action: EmployeeActionTypes) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_COMPLETE:
      return { ...state, ...mapKeys(action.employees) };
    default:
      return state;
  }
};
