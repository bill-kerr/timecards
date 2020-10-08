export interface User {
  id: string;
  username: string;
}

export const AUTH_LOGIN_START = 'Auth:LoginStart';
export const AUTH_LOGIN_COMPLETE = 'Auth:LoginComplete';
export const AUTH_LOGIN_ERROR = 'Auth:LoginError';

export interface AuthLoginStartAction {
  type: typeof AUTH_LOGIN_START;
}

export interface AuthLoginErrorAction {
  type: typeof AUTH_LOGIN_ERROR;
}

export interface AuthLoginCompleteAction {
  type: typeof AUTH_LOGIN_COMPLETE;
  user: User;
  accessToken: string;
}

export const AUTH_REFRESH_START = 'Auth:RefreshStart';
export const AUTH_REFRESH_COMPLETE = 'Auth:RefreshComplete';
export const AUTH_REFRESH_ERROR = 'Auth:RefreshError';

export interface AuthRefreshStartAction {
  type: typeof AUTH_REFRESH_START;
}

export interface AuthRefreshCompleteAction {
  type: typeof AUTH_REFRESH_COMPLETE;
  user: User;
  accessToken: string;
}

export interface AuthRefreshErrorAction {
  type: typeof AUTH_REFRESH_ERROR;
}

export const AUTH_LOGOUT = 'Auth:Logout';

export interface AuthLogoutAction {
  type: typeof AUTH_LOGOUT;
}

export type AuthActionTypes =
  | AuthLoginCompleteAction
  | AuthLoginErrorAction
  | AuthLoginStartAction
  | AuthRefreshStartAction
  | AuthRefreshErrorAction
  | AuthRefreshCompleteAction
  | AuthLogoutAction;
