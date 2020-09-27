import { SettingsSetWeekEndingAction, SETTINGS_SET_WEEK_ENDING } from './types';

export const setWeekEnding = (date: Date): SettingsSetWeekEndingAction => {
  return { type: SETTINGS_SET_WEEK_ENDING, weekEnding: date };
};
