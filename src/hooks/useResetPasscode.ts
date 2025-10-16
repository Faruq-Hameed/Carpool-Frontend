import { resetPasscodeReducer, actionTypes, BaseState } from "@/reducers/resetPasscodeReducer";
import { useReducer } from "react";

export function useResetPasscode() {
  const [state, dispatch] = useReducer(resetPasscodeReducer, BaseState);

  return {
    state,
    setPhoneNumber: (value: string) =>
      dispatch({ type: actionTypes.SET_PHONE_NUMBER, payload: value }),
    setEmail: (value: string) =>
      dispatch({ type: actionTypes.SET_EMAIL, payload: value }),
    switchToEmail: () =>
      dispatch({ type: actionTypes.USE_EMAIL_INSTEAD, payload: true }),
    switchToPhone: () =>
      dispatch({ type: actionTypes.USE_PHONE_NUMBER_INSTEAD, payload: true }),
    setError: (message: string) =>
      dispatch({ type: actionTypes.SET_ERROR, payload: message }),
  };
}