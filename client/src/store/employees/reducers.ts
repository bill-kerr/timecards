import { Dictionary } from '../../types';
import { mapKeys } from '../../utils';
import {
  Employee,
  EmployeesActionTypes,
  EMPLOYEES_FETCH_COMPLETE,
  EMPLOYEES_SET_ACTIVE,
  EMPLOYEES_UPDATE_COMPLETE,
} from './types';

interface EmployeesState {
  activeEmployeeIds: string[];
  employees: Dictionary<Employee>;
}

const initialState: EmployeesState = {
  activeEmployeeIds: [],
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
    case EMPLOYEES_SET_ACTIVE:
      return { ...state, activeEmployeeIds: action.employeeIds };
    default:
      return state;
  }
};
