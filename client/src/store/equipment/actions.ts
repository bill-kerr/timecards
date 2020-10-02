import { AsyncAction } from '..';
import { timecardsClient } from '../../apis/timecards';
import { isError } from '../../utils';
import {
  EQUIPMENT_FETCH_COMPLETE,
  EQUIPMENT_FETCH_START,
  EquipmentFetchCompleteAction,
  EQUIPMENT_FETCH_ERROR,
  EquipmentFetchErrorAction,
} from './types';

export const getEquipment = (): AsyncAction<EquipmentFetchCompleteAction | EquipmentFetchErrorAction> => {
  return async (dispatch) => {
    dispatch({ type: EQUIPMENT_FETCH_START });

    const response = await timecardsClient.getEquipment();
    if (isError(response)) {
      return dispatch({ type: EQUIPMENT_FETCH_ERROR });
    }
    return dispatch({ type: EQUIPMENT_FETCH_COMPLETE, equipment: response });
  };
};
