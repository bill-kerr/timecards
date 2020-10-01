import { firstAndLastOfWeek } from '../../utils';
import { Settings, SettingsActionTypes, SETTINGS_SET_WEEK_ENDING } from './types';

const initialState: Settings = {
  weekEnding: firstAndLastOfWeek(new Date()).end,
};

export const settingsReducer = (state = initialState, action: SettingsActionTypes): Settings => {
  switch (action.type) {
    case SETTINGS_SET_WEEK_ENDING:
      return { ...state, weekEnding: action.weekEnding };
    default:
      return state;
  }
};
