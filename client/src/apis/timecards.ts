import axios from 'axios';
import { TIMECARDS_BASE_URL } from '../constants';
import { Employee } from '../store/employees/types';
import { Equipment } from '../store/equipment/types';
import { Job } from '../store/jobs/types';
import { TimecardCostCode } from '../store/timecard-cost-codes/types';
import { TimecardEmployee } from '../store/timecard-employees/types';
import { Timecard } from '../store/timecards/types';

const headers = {
  'Content-Type': 'application/json',
};

const axiosClient = axios.create({
  baseURL: TIMECARDS_BASE_URL,
});

export interface ITimecardsClient {
  getEmployees: () => Promise<Employee[] | ErrorResponse>;
  updateEmployee: (id: string, employee: Partial<Employee>) => Promise<Employee | ErrorResponse>;
  getTimecards: (startDate: string, endDate: string) => Promise<Timecard[] | ErrorResponse>;
  getJobs: () => Promise<Job[] | ErrorResponse>;
  getEquipment: () => Promise<Equipment[] | ErrorResponse>;
  getTimecardEmployeesByTimecard: (timecardId: string) => Promise<TimecardEmployee[] | ErrorResponse>;
  getTimecardEmployees: (startDate: string, endDate: string) => Promise<TimecardEmployee[] | ErrorResponse>;
  getTimecardCostCodes: (startDate: string, endDate: string) => Promise<TimecardCostCode[] | ErrorResponse>;
}

export interface ErrorResponse {
  error: string;
  code: number;
  details: string;
}

const errorResponse: ErrorResponse = {
  error: 'Error retrieving data',
  code: 500,
  details: 'Error retrieving data',
};

export const timecardsClient: ITimecardsClient = {
  getEmployees: async () => {
    try {
      const res = await axiosClient.get<Employee[]>('/employees');
      return res.data;
    } catch (error) {
      return errorResponse;
    }
  },

  updateEmployee: async (id, employee) => {
    try {
      const res = await axiosClient.patch<Employee>(`/employees/${id}`, employee, { headers });
      return res.data;
    } catch (error) {
      return errorResponse;
    }
  },

  getTimecards: async (startDate: string, endDate: string) => {
    try {
      const res = await axiosClient.get<Timecard[]>('/timecards', {
        params: { startDate, endDate },
      });
      return res.data;
    } catch (error) {
      return errorResponse;
    }
  },

  getJobs: async () => {
    try {
      const res = await axiosClient.get<Job[]>('/jobs');
      return res.data;
    } catch (error) {
      return errorResponse;
    }
  },

  getEquipment: async () => {
    try {
      const res = await axiosClient.get<Equipment[]>('/equipment');
      return res.data;
    } catch (error) {
      return errorResponse;
    }
  },

  getTimecardEmployeesByTimecard: async (timecardId) => {
    try {
      const res = await axiosClient.get<TimecardEmployee[]>(`/timecards/${timecardId}/timecard-employees`);
      return res.data;
    } catch (error) {
      return errorResponse;
    }
  },

  getTimecardEmployees: async (startDate, endDate) => {
    try {
      const res = await axiosClient.get<TimecardEmployee[]>('/timecard-employees', {
        params: { startDate, endDate },
      });
      return res.data;
    } catch (error) {
      return errorResponse;
    }
  },

  getTimecardCostCodes: async (startDate, endDate) => {
    try {
      const res = await axiosClient.get<TimecardCostCode[]>('/timecard-cost-codes', {
        params: { startDate, endDate },
      });
      return res.data;
    } catch (error) {
      return errorResponse;
    }
  },
};
