import { Dictionary } from '../../types';
import { mapKeys } from '../../utils';
import {
  TimecardCostCode,
  TimecardCostCodesActionTypes,
  TIMECARD_COST_CODES_FETCH_COMPLETE,
  TIMECARD_COST_CODES_FETCH_ERROR,
  TIMECARD_COST_CODES_FETCH_START,
} from './types';

interface TimecardCostCodesState {
  timecardCostCodes: Dictionary<TimecardCostCode>;
  loading: boolean;
}

const initialState: TimecardCostCodesState = {
  timecardCostCodes: {},
  loading: true,
};

export const timecardCostCodesReducer = (
  state = initialState,
  action: TimecardCostCodesActionTypes
): TimecardCostCodesState => {
  switch (action.type) {
    case TIMECARD_COST_CODES_FETCH_START:
      return { ...state, loading: true };
    case TIMECARD_COST_CODES_FETCH_COMPLETE:
      return {
        loading: false,
        timecardCostCodes: mapKeys(action.timecardCostCodes),
      };
    case TIMECARD_COST_CODES_FETCH_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
};
