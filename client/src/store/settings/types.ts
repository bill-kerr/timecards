export interface Settings {
  weekEnding: Date;
}

export const SETTINGS_SET_WEEK_ENDING = 'Settings:SetWeekEnding';

export interface SettingsSetWeekEndingAction {
  type: typeof SETTINGS_SET_WEEK_ENDING;
  weekEnding: Date;
}

export type SettingsActionTypes = SettingsSetWeekEndingAction;
