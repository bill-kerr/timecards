import { Dictionary } from '../../types';
import { mapKeys } from '../../utils';
import { Timecard, TimecardActionTypes, TIMECARDS_FETCH_COMPLETE } from './types';

const initialState: Dictionary<Timecard> = {};

export const timecardsReducer = (state = initialState, action: TimecardActionTypes) => {
  switch (action.type) {
    case TIMECARDS_FETCH_COMPLETE:
      return { ...state, ...mapKeys(action.timecards) };
    default:
      return state;
  }
};
