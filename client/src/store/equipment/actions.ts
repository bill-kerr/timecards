import { AsyncAction } from '..';
import { timecardsClient } from '../../apis/timecards';
import { EQUIPMENT_FETCH_COMPLETE, EQUIPMENT_FETCH_START, IEquipmentFetchCompleteAction } from './types';

export const getEquipment = (): AsyncAction<IEquipmentFetchCompleteAction> => {
  return async (dispatch) => {
    dispatch({ type: EQUIPMENT_FETCH_START });

    const equipment = await timecardsClient.getEquipment();
    return dispatch({ type: EQUIPMENT_FETCH_COMPLETE, equipment });
  };
};
