import { AuthActionTypes, AUTH_LOGIN_COMPLETE, AUTH_REFRESH_COMPLETE, User } from './types';

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
    case AUTH_REFRESH_COMPLETE:
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
      };
    default:
      return state;
  }
};
