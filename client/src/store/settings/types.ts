import { DateRange } from '../../types';

export interface Settings {
  timecardDateRange: DateRange;
  weekEnding: Date;
}

export const SETTINGS_SET_TIMECARD_DATE_RANGE = 'Settings:SetTimecardDateRange';
export const SETTINGS_SET_WEEK_ENDING = 'Settings:SetWeekEnding';

export interface SettingsSetTimecardDateRangeAction {
  type: typeof SETTINGS_SET_TIMECARD_DATE_RANGE;
  dateRange: DateRange;
}

export interface SettingsSetWeekEndingAction {
  type: typeof SETTINGS_SET_WEEK_ENDING;
  weekEnding: Date;
}

export type SettingsActionTypes = SettingsSetTimecardDateRangeAction | SettingsSetWeekEndingAction;
