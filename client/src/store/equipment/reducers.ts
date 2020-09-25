import { Dictionary } from '../../types';
import { mapKeys } from '../../utils';
import { Equipment, EquipmentActionTypes, EQUIPMENT_FETCH_COMPLETE } from './types';

const initialState: Dictionary<Equipment> = {};

export const equipmentReducer = (state = initialState, action: EquipmentActionTypes): Dictionary<Equipment> => {
  switch (action.type) {
    case EQUIPMENT_FETCH_COMPLETE:
      return { ...state, ...mapKeys(action.equipment) };
    default:
      return state;
  }
};
