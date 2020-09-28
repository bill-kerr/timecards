import addTime from 'date-fns/add';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import fnsFormat from 'date-fns/format';
import { DATE_FORMAT } from './constants';
import { DateRange, Dictionary, Identifiable } from './types';

export const mapKeys = <T extends Identifiable>(list: T[]): Dictionary<T> => {
  const result: Dictionary<T> = {};
  list.forEach((item) => (result[item.id] = item));
  return result;
};

export const values = <T>(object: Dictionary<T>, filter?: (elem: T) => boolean): T[] => {
  const list: T[] = [];
  Object.values(object).forEach((elem) => {
    if (!filter) {
      list.push(elem);
    } else if (filter && filter(elem)) {
      list.push(elem);
    }
  });
  return list;
};

export const filterDict = <T extends Identifiable>(
  dictionary: Dictionary<T>,
  filter: (elem: T) => boolean
) => {
  const filteredDict: Dictionary<T> = {};
  values(dictionary).forEach((elem) => {
    if (filter(elem)) {
      filteredDict[elem.id] = elem;
    }
  });
  return filteredDict;
};

export const lastDayOfWeek = (date?: Date): Date => {
  const _date = date ? date : new Date();
  const addDays = 6 - _date.getDay();
  return addTime(_date, { days: addDays });
};

export const firstDayOfWeek = (date?: Date): Date => {
  const _date = date ? date : new Date();
  const subDays = -_date.getDay();
  return addTime(_date, { days: subDays });
};

export const twoWeekRange = (baseDate?: Date): DateRange => {
  const date = baseDate ? baseDate : new Date();
  return {
    start: addTime(firstDayOfWeek(date), { weeks: -1 }),
    end: lastDayOfWeek(date),
  };
};

export const getEachDayOfWeek = (weekEnding?: Date): Date[] => {
  const endDate = weekEnding ? weekEnding : lastDayOfWeek(new Date());
  return eachDayOfInterval({
    start: firstDayOfWeek(endDate),
    end: endDate,
  });
};

export const firstAndLastOfWeek = (date: Date): DateRange => {
  return {
    start: firstDayOfWeek(date),
    end: lastDayOfWeek(date),
  };
};

export const formatDate = (date: Date, format?: string): string => {
  return format ? fnsFormat(date, format) : fnsFormat(date, DATE_FORMAT);
};

export const formatRange = (dateRange: DateRange, format?: string): [string, string] => {
  return [formatDate(dateRange.start, format), formatDate(dateRange.end, format)];
};

export const weekDayLabel = (day: number) => {
  switch (day) {
    case 0:
    case 6:
      return 'S';
    case 2:
    case 4:
      return 'T';
    case 1:
      return 'M';
    case 3:
      return 'W';
    case 5:
      return 'F';
    default:
      return '';
  }
};

export const noop = () => {};

export const nextWeekEnding = (currentDate: Date): Date => {
  const date = addTime(currentDate, { weeks: 1 });
  return lastDayOfWeek(date);
};

export const prevWeekEnding = (currentDate: Date): Date => {
  const date = addTime(currentDate, { weeks: -1 });
  return lastDayOfWeek(date);
};

export const isEmptyObj = (obj: Object): boolean => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};
