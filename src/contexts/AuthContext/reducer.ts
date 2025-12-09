import UserKycStatus from "@/models/UserKycStatus";
import { InitialState, intialAuthContextState } from "./initialState";

export const actionTypes = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_LOGIN_STATUS: "SET_LOGIN_STATUS",
  LOGOUT: "LOGOUT",
  SET_TOKEN: "SET_TOKEN",
  REMOVE_TOKEN: "REMOVE_TOKEN",
  SET_KYC_STATUS: "SET_KYC_STATUS",
};

export function authReducer(
  state: InitialState,

  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case actionTypes.SET_CURRENT_USER:
      return { ...state, currentUser: payload };

    case actionTypes.SET_TOKEN:
      return { ...state, token: payload };

    case actionTypes.REMOVE_TOKEN:
      return { ...state, isLoggedIn: false, token: null };

    case actionTypes.SET_LOGIN_STATUS:
      return { ...state, isLoggedIn: payload };

    case actionTypes.SET_KYC_STATUS:
      return { ...state, UserKycStatus: payload as UserKycStatus };

    case actionTypes.LOGOUT:
      return intialAuthContextState;

    default:
      return { ...state };
  }
}
