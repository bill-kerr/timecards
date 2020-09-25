import { Dictionary, Identifiable } from './types';

export const mapKeys = <T extends Identifiable>(list: T[]): Dictionary<T> => {
  const result: Dictionary<T> = {};
  list.forEach((item) => (result[item.id] = item));
  return result;
};

export const values = <T>(object: Dictionary<T>): T[] => {
  return Object.values(object).map((item) => item);
};
