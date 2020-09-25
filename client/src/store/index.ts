import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action, combineReducers } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { employeesReducer } from './employees/reducers';
import { EmployeesActionTypes } from './employees/types';
import { equipmentReducer } from './equipment/reducers';
import { EquipmentActionTypes } from './equipment/types';
import { jobsReducer } from './jobs/reducers';
import { JobsActionTypes } from './jobs/types';
import { timecardsReducer } from './timecards/reducers';
import { TimecardsActionTypes } from './timecards/types';

export const rootReducer = combineReducers({
  employees: employeesReducer,
  timecards: timecardsReducer,
  jobs: jobsReducer,
  equipment: equipmentReducer,
});

export type ActionTypes = EmployeesActionTypes | TimecardsActionTypes | JobsActionTypes | EquipmentActionTypes;

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type Dispatch = ThunkDispatch<RootState, any, ActionTypes>;
export const useTypedDispatch = () => useDispatch<Dispatch>();

export type AsyncAction<A extends Action> = (dispatch: Dispatch, getState: () => RootState) => Promise<A>;
