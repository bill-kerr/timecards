import { Dictionary } from '../../types';
import { mapKeys } from '../../utils';
import { Employee, EmployeesActionTypes, EMPLOYEES_FETCH_COMPLETE, EMPLOYEES_UPDATE_COMPLETE } from './types';

const initialState: Dictionary<Employee> = {};

export const employeesReducer = (state = initialState, action: EmployeesActionTypes): Dictionary<Employee> => {
  switch (action.type) {
    case EMPLOYEES_FETCH_COMPLETE:
      return { ...state, ...mapKeys(action.employees) };
    case EMPLOYEES_UPDATE_COMPLETE:
      return { ...state, [action.employee.id]: action.employee };
    default:
      return state;
  }
};
