import { EmployeeHours } from './store/timecard-employees/types';

export interface Identifiable {
  id: string;
}
export type Dictionary<T> = { [key: string]: T };

export interface DateRange {
  start: Date;
  end: Date;
}

export interface Hours {
  st: number;
  ot: number;
  dt: number;
}

export interface TagCodes {
  st: string;
  ot: string;
  dt: string;
}

export interface CostCodeHours extends EmployeeHours {
  date: string;
}
