import { Dictionary } from '../../types';
import { mapKeys } from '../../utils';
import { Employee, EmployeesActionTypes, EMPLOYEES_FETCH_COMPLETE, EMPLOYEES_UPDATE_COMPLETE } from './types';

interface EmployeesState {
  employees: Dictionary<Employee>;
}

const initialState: EmployeesState = {
  employees: {},
};

export const employeesReducer = (state = initialState, action: EmployeesActionTypes): EmployeesState => {
  switch (action.type) {
    case EMPLOYEES_FETCH_COMPLETE:
      return {
        ...state,
        employees: { ...state.employees, ...mapKeys(action.employees) },
      };
    case EMPLOYEES_UPDATE_COMPLETE:
      return {
        ...state,
        employees: { ...state.employees, [action.employee.id]: action.employee },
      };
    default:
      return state;
  }
};
