import { DateRange } from '../../types';
import { SettingsSetTimecardDateRangeAction, SETTINGS_SET_TIMECARD_DATE_RANGE } from './types';

export const setTimecardDateRange = (dateRange: DateRange): SettingsSetTimecardDateRangeAction => {
  return { type: SETTINGS_SET_TIMECARD_DATE_RANGE, dateRange };
};
