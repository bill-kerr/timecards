import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action, combineReducers } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { authReducer } from './auth/reducers';
import { AuthActionTypes } from './auth/types';
import { employeesReducer } from './employees/reducers';
import { EmployeesActionTypes } from './employees/types';
import { equipmentReducer } from './equipment/reducers';
import { EquipmentActionTypes } from './equipment/types';
import { jobsReducer } from './jobs/reducers';
import { JobsActionTypes } from './jobs/types';
import { settingsReducer } from './settings/reducers';
import { SettingsActionTypes } from './settings/types';
import { timecardCostCodesReducer } from './timecard-cost-codes/reducers';
import { TimecardCostCodesActionTypes } from './timecard-cost-codes/types';
import { timecardEmployeesReducer } from './timecard-employees/reducers';
import { TimecardEmployeesActionTypes } from './timecard-employees/types';
import { timecardsReducer } from './timecards/reducers';
import { TimecardsActionTypes } from './timecards/types';

export const rootReducer = combineReducers({
  employees: employeesReducer,
  timecards: timecardsReducer,
  timecardEmployees: timecardEmployeesReducer,
  timecardCostCodes: timecardCostCodesReducer,
  jobs: jobsReducer,
  equipment: equipmentReducer,
  settings: settingsReducer,
  auth: authReducer,
});

export type ActionTypes =
  | EmployeesActionTypes
  | TimecardsActionTypes
  | JobsActionTypes
  | EquipmentActionTypes
  | TimecardEmployeesActionTypes
  | TimecardCostCodesActionTypes
  | SettingsActionTypes
  | AuthActionTypes;

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type SelectorArgs = Parameters<Parameters<TypedUseSelectorHook<RootState>>[0]>[0];

export type Dispatch = ThunkDispatch<RootState, any, ActionTypes>;
export const useTypedDispatch = () => useDispatch<Dispatch>();

export type AsyncAction<A extends Action> = (dispatch: Dispatch, getState: () => RootState) => Promise<A>;
