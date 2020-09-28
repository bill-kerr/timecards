import { Dictionary } from '../../types';
import { mapKeys } from '../../utils';
import {
  TimecardEmployee,
  TimecardEmployeesActionTypes,
  TIMECARD_EMPLOYEES_FETCH_COMPLETE,
  TIMECARD_EMPLOYEES_FETCH_ERROR,
  TIMECARD_EMPLOYEES_FETCH_START,
} from './types';

interface TimecardEmployeesState {
  timecardEmployees: Dictionary<TimecardEmployee>;
  loading: boolean;
}

const initialState: TimecardEmployeesState = {
  timecardEmployees: {},
  loading: false,
};

export const timecardEmployeesReducer = (
  state = initialState,
  action: TimecardEmployeesActionTypes
): TimecardEmployeesState => {
  switch (action.type) {
    case TIMECARD_EMPLOYEES_FETCH_START:
      return { ...state, loading: true };
    case TIMECARD_EMPLOYEES_FETCH_COMPLETE:
      return {
        loading: false,
        timecardEmployees: { ...state.timecardEmployees, ...mapKeys(action.timecardEmployees) },
      };
    case TIMECARD_EMPLOYEES_FETCH_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
};
