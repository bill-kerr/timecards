import {
  AuthActionTypes,
  AUTH_LOGIN_COMPLETE,
  AUTH_LOGOUT,
  AUTH_REFRESH_COMPLETE,
  User,
} from './types';

interface AuthState {
  user: User | null;
  accessToken: string;
}

const initialState: AuthState = {
  user: null,
  accessToken: '',
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case AUTH_LOGIN_COMPLETE:
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
      };
    case AUTH_REFRESH_COMPLETE:
      return {
        ...state,
        user: action.setUser ? action.user : state.user,
        accessToken: action.accessToken,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        user: null,
        accessToken: '',
      };
    default:
      return state;
  }
};
