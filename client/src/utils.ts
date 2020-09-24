export type Dictionary<T> = { [key: string]: T };

export const mapKeys = <T extends object>(object: T[], iteratee: string): Dictionary<T> => {
  const result: Dictionary<T> = {};
  object.forEach((object) => (result[iteratee] = object));
  return result;
};
