import axios from 'axios';
import { TIMECARDS_BASE_URL } from '../constants';
import { Employee } from '../store/employees/types';
import { Timecard } from '../store/timecards/types';

const headers = {
  'Content-Type': 'application/json',
};

const axiosClient = axios.create({
  baseURL: TIMECARDS_BASE_URL,
});

export interface ITimecardsClient {
  getEmployees: () => Promise<Employee[]>;
  updateEmployee: (id: string, employee: Partial<Employee>) => Promise<Employee>;
  getTimecards: (startDate: string, endDate: string) => Promise<Timecard[]>;
}

export const timecardsClient: ITimecardsClient = {
  getEmployees: async () => {
    const { data } = await axiosClient.get<Employee[]>('/employees');
    return data;
  },

  updateEmployee: async (id, employee) => {
    const res = await axiosClient.patch<Employee>(`/employees/${id}`, employee, { headers });
    return res.data;
  },

  getTimecards: async (startDate: string, endDate: string) => {
    const res = await axiosClient.get<Timecard[]>('/timecards', {
      params: {
        startDate,
        endDate,
      },
    });
    return res.data;
  },
};
