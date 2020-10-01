import { Dictionary } from '../../types';
import { mapTimecardEmployees } from '../../utils';
import {
  TimecardEmployee,
  TimecardEmployeesActionTypes,
  TIMECARD_EMPLOYEES_FETCH_COMPLETE,
  TIMECARD_EMPLOYEES_FETCH_ERROR,
  TIMECARD_EMPLOYEES_FETCH_START,
} from './types';

interface TimecardEmployeesState {
  timecardEmployees: Dictionary<TimecardEmployee[]>;
  loading: boolean;
}

const initialState: TimecardEmployeesState = {
  timecardEmployees: {},
  loading: true,
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
        timecardEmployees: mapTimecardEmployees(action.timecardEmployees),
      };
    case TIMECARD_EMPLOYEES_FETCH_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
};
