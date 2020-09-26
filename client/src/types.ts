export interface Identifiable {
  id: string;
}
export type Dictionary<T> = { [key: string]: T };

export interface DateRange {
  startDate: Date;
  endDate: Date;
}
