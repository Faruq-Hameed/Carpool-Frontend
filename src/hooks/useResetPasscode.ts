import {
  resetPasscodeReducer,
  actionTypes,
  BaseState,
} from "@/reducers/resetPasscodeReducer";
import { useReducer } from "react";

/**
 * Custom hook for managing the state and actions related to resetting a user's passcode.
 *
 * This hook provides state and a set of dispatch functions to handle passcode reset flows,
 * including switching between phone and email, setting OTP, passcode, and error messages.
 *
 * @returns {{
 *   state: any,
 *   setPhoneNumber: (value: string) => void,
 *   setEmail: (value: string) => void,
 *   switchToEmail: () => void,
 *   switchToPhone: () => void,
 *   setError: (message: string) => void,
 *   setOtp: (value: string) => void,
 *   setPasscode: (value: string) => void,
 *   setCompletionMessage: (value: string) => void
 * }} An object containing the current state and dispatch functions for passcode reset.
 *
 * @example
 * const {
 *   state,
 *   setPhoneNumber,
 *   setEmail,
 *   switchToEmail,
 *   switchToPhone,
 *   setError,
 *   setOtp,
 *   setPasscode,
 *   setCompletionMessage
 * } = useResetPasscode();
 */
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
    setOtp: (value: string) =>
      dispatch({ type: actionTypes.SET_OTP, payload: value }),
    //The next two will be functional in the screen after enter otp
    setPasscode: (value: string) =>
      dispatch({ type: actionTypes.SET_PASSCODE, payload: value }),
    setCompletionMessage: (value: string) =>
      dispatch({ type: actionTypes.SET_COMPLETION_MESSAGE, payload: value }),
  };
}
