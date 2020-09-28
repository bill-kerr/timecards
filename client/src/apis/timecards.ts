import axios from 'axios';
import { TIMECARDS_BASE_URL } from '../constants';
import { Employee } from '../store/employees/types';
import { Equipment } from '../store/equipment/types';
import { Job } from '../store/jobs/types';
import { TimecardEmployee } from '../store/timecard-employees/types';
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
  getJobs: () => Promise<Job[]>;
  getEquipment: () => Promise<Equipment[]>;
  getTimecardEmployeesByTimecard: (timecardId: string) => Promise<TimecardEmployee[]>;
  getTimecardEmployees: (startDate: string, endDate: string) => Promise<TimecardEmployee[]>;
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
      params: { startDate, endDate },
    });
    return res.data;
  },

  getJobs: async () => {
    const res = await axiosClient.get<Job[]>('/jobs');
    return res.data;
  },

  getEquipment: async () => {
    const res = await axiosClient.get<Equipment[]>('/equipment');
    return res.data;
  },

  getTimecardEmployeesByTimecard: async (timecardId) => {
    const res = await axiosClient.get<TimecardEmployee[]>(
      `/timecards/${timecardId}/timecard-employees`
    );
    return res.data;
  },

  getTimecardEmployees: async (startDate, endDate) => {
    const res = await axiosClient.get<TimecardEmployee[]>('/timecard-employees', {
      params: { startDate, endDate },
    });
    return res.data;
  },
};
