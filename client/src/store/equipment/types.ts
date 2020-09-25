export interface Equipment {
  id: string;
  code: string;
  description: string;
  isRental: boolean;
  make: string;
  model: string;
  serialNumber: string;
  year: number;
  operatorPayClass: string;
}

export const EQUIPMENT_FETCH_START = 'Equipment:FetchStart';
export const EQUIPMENT_FETCH_COMPLETE = 'Equipment:FetchComplete';
export const EQUIPMENT_FETCH_ERROR = 'Equipment:FetchError';

export interface IEquipmentFetchStartAction {
  type: typeof EQUIPMENT_FETCH_START;
}

export interface IEquipmentFetchCompleteAction {
  type: typeof EQUIPMENT_FETCH_COMPLETE;
  equipment: Equipment[];
}

export interface IEquipmentFetchErrorAction {
  type: typeof EQUIPMENT_FETCH_ERROR;
}

export type EquipmentActionTypes =
  | IEquipmentFetchCompleteAction
  | IEquipmentFetchStartAction
  | IEquipmentFetchErrorAction;
