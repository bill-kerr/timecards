import axios from 'axios';
import { TIMECARDS_BASE_URL } from '../constants';
import { Employee } from '../store/employees/types';

const axiosClient = axios.create({
  baseURL: TIMECARDS_BASE_URL,
});

export interface ITimecardsClient {
  getEmployees: () => Promise<Employee[]>;
}

export const timecardsClient: ITimecardsClient = {
  getEmployees: async () => {
    const { data } = await axiosClient.get<Employee[]>('/employees');
    return data;
  },
};
