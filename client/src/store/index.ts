import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action, combineReducers } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { employeeReducer } from './employees/reducers';
import { EmployeeActionTypes } from './employees/types';
import { timecardsReducer } from './timecards/reducers';
import { TimecardActionTypes } from './timecards/types';

export const rootReducer = combineReducers({
  employees: employeeReducer,
  timecards: timecardsReducer,
});

export type ActionTypes = EmployeeActionTypes | TimecardActionTypes;

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type Dispatch = ThunkDispatch<RootState, any, ActionTypes>;
export const useTypedDispatch = () => useDispatch<Dispatch>();

export type AsyncAction<A extends Action> = (dispatch: Dispatch, getState: () => RootState) => Promise<A>;
