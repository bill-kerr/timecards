export interface Identifiable {
  id: string;
}
export type Dictionary<T> = { [key: string]: T };

export interface DateRange {
  startDate: IDate;
  endDate: IDate;
}

export interface IDate {
  date: Date;
  toString: () => string;
}
