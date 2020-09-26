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
    startDate: addTime(firstDayOfWeek(date), { weeks: -1 }),
    endDate: lastDayOfWeek(date),
  };
};

export const getEachDayOfWeek = (weekEnding?: Date): Date[] => {
  const endDate = weekEnding ? weekEnding : lastDayOfWeek(new Date());
  return eachDayOfInterval({
    start: firstDayOfWeek(endDate),
    end: endDate,
  });
};

export const formatDate = (date: Date, format?: string): string => {
  return format ? fnsFormat(date, format) : fnsFormat(date, DATE_FORMAT);
};
