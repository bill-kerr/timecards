import { AsyncAction } from '..';
import { timecardsClient } from '../../apis/timecards';
import { isError } from '../../utils';
import {
  AuthLoginCompleteAction,
  AuthLoginErrorAction,
  AuthLogoutAction,
  AuthRefreshCompleteAction,
  AuthRefreshErrorAction,
  AUTH_LOGIN_COMPLETE,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_START,
  AUTH_LOGOUT,
  AUTH_REFRESH_COMPLETE,
  AUTH_REFRESH_ERROR,
  AUTH_REFRESH_START,
  User,
} from './types';

export const login = (
  username: string,
  password: string
): AsyncAction<AuthLoginCompleteAction | AuthLoginErrorAction> => {
  return async (dispatch, getState) => {
    dispatch({ type: AUTH_LOGIN_START });

    const token = getState().auth.accessToken;
    const response = await timecardsClient(token).login(username, password);
    if (isError(response)) {
      return dispatch({ type: AUTH_LOGIN_ERROR });
    }

    const user: User = { id: response.id, username: response.username };
    return dispatch({ type: AUTH_LOGIN_COMPLETE, user, accessToken: response.accessToken });
  };
};

export const refreshToken = (): AsyncAction<AuthRefreshCompleteAction | AuthRefreshErrorAction> => {
  return async (dispatch, getState) => {
    dispatch({ type: AUTH_REFRESH_START });

    const token = getState().auth.accessToken;
    const response = await timecardsClient(token).refreshToken();
    if (isError(response)) {
      return dispatch({ type: AUTH_REFRESH_ERROR });
    }

    const user: User = { id: response.id, username: response.username };
    return dispatch({ type: AUTH_REFRESH_COMPLETE, user, accessToken: response.accessToken });
  };
};

export const logout = (): AuthLogoutAction => {
  return { type: AUTH_LOGOUT };
};
