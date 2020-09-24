import { combineReducers } from 'redux';
import { employeeReducer } from './employees/reducers';

export const rootReducer = combineReducers({
  employees: employeeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
