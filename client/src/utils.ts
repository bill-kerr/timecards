import toDate from 'date-fns/toDate';
import formatDate from 'date-fns/format';
import sub from 'date-fns/sub';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import { DateRange, Dictionary, IDate, Identifiable } from './types';

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

export const newDate = (date?: Date): IDate => {
  const _date = date ? toDate(date) : new Date();
  return {
    date: _date,
    toString: () => formatDate(_date, 'yyyy-MM-dd'),
  };
};

export const twoWeekRange: DateRange = {
  startDate: newDate(sub(startOfWeek(new Date()), { weeks: 1 })),
  endDate: newDate(endOfWeek(new Date())),
};
