import type { InitialState } from '.';

export const actionTypes = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_LOGIN_STATUS: "SET_LOGIN_STATUS",
  LOGOUT: "LOGOUT",
  SET_TOKEN: "SET_TOKEN",
};

export function authReducer(
  state: InitialState,

  { type, payload }: { type: string; payload: any },
) {
  switch (type) {
    case actionTypes.SET_CURRENT_USER:
      return { ...state, currentUser: payload };

    case actionTypes.SET_TOKEN:
      return { ...state, token: payload };
    
    case actionTypes.SET_LOGIN_STATUS:
      return { ...state, isLoggedIn: payload };

    case actionTypes.LOGOUT:
      return {
        ...state,
        currentUser: null,
        isLoggedIn: false,
        token: null,
      };

    default:
      return { ...state };
  }
}
