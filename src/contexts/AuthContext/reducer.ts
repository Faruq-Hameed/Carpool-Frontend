import type { InitialState } from '.';

export const actionTypes = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  UPDATE_USER_SESSION: 'UPDATE_USER_SESSION', //i.e to isLoggedIn true or false
  LOGOUT: 'LOGOUT',
};

export function authReducer(
  state: InitialState,

  { type, payload }: { type: string; payload: any },
) {
  switch (type) {
    case actionTypes.SET_CURRENT_USER:
      return { ...state, currentUser: payload };

    case actionTypes.UPDATE_USER_SESSION:
      return { ...state, isLoggedIn: payload };

    case actionTypes.LOGOUT:
      return {
        ...state,
        currentUser: null,
        isLoggedIn: false,
      };

    default:
      return { ...state };
  }
}
