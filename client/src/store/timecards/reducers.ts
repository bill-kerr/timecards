import { Dictionary } from '../../types';
import { mapKeys } from '../../utils';
import { Timecard, TimecardsActionTypes, TIMECARDS_FETCH_COMPLETE } from './types';

const initialState: Dictionary<Timecard> = {};

export const timecardsReducer = (
  state = initialState,
  action: TimecardsActionTypes
): Dictionary<Timecard> => {
  switch (action.type) {
    case TIMECARDS_FETCH_COMPLETE:
      return { ...state, ...mapKeys(action.timecards) };
    default:
      return state;
  }
};
