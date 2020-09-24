import { EmployeeActionTypes, FETCH_EMPLOYEES_COMPLETE } from './types';
import { mapKeys } from '../../utils';

const initialState = {};

export const employeeReducer = (state = initialState, action: EmployeeActionTypes) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_COMPLETE:
      return { ...state, ...mapKeys(action.employees, 'id') };
    default:
      return state;
  }
};
