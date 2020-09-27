import { Settings, SettingsActionTypes, SETTINGS_SET_WEEK_ENDING } from './types';

const initialState: Settings = {
  weekEnding: new Date(2020, 8, 26), //twoWeekRange().endDate,
};

export const settingsReducer = (state = initialState, action: SettingsActionTypes): Settings => {
  switch (action.type) {
    case SETTINGS_SET_WEEK_ENDING:
      return { ...state, weekEnding: action.weekEnding };
    default:
      return state;
  }
};
