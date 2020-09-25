import { Dictionary, Identifiable } from './types';

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

export const filterDict = <T extends Identifiable>(dictionary: Dictionary<T>, filter: (elem: T) => boolean) => {
  const filteredDict: Dictionary<T> = {};
  values(dictionary).forEach((elem) => {
    if (filter(elem)) {
      filteredDict[elem.id] = elem;
    }
  });
  return filteredDict;
};
