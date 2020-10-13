import { Dictionary } from '../../types';
import { mapKeys } from '../../utils';
import { Employee, EmployeesActionTypes, EMPLOYEES_FETCH_COMPLETE, EMPLOYEES_FETCH_START, EMPLOYEES_UPDATE_COMPLETE, EMPLOYEES_UPDATE_START } from './types';

interface EmployeesState {
  employees: Dictionary<Employee>;
  loading: boolean;
}

const initialState: EmployeesState = {
  employees: {},
  loading: false,
};

export const employeesReducer = (state = initialState, action: EmployeesActionTypes): EmployeesState => {
  switch (action.type) {
    case EMPLOYEES_FETCH_START:
    case EMPLOYEES_UPDATE_START:
      return { ...state, loading: true };
    case EMPLOYEES_FETCH_COMPLETE:
      return {
        ...state,
        employees: { ...state.employees, ...mapKeys(action.employees) },
        loading: false,
      };
    case EMPLOYEES_UPDATE_COMPLETE:
      return {
        ...state,
        employees: { ...state.employees, [action.employee.id]: action.employee },
        loading: false,
      };
    default:
      return state;
  }
};
