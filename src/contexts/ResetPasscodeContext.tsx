import React, { createContext, useReducer, useContext, ReactNode } from "react";
import {
  resetPasscodeReducer,
  BaseState,
  actionTypes,
  IInitialState,
  Action,
} from "@/reducers/resetPasscodeReducer";

export interface ResetPasscodeContextType {
  state: IInitialState;
  setPhoneNumber: (value: string) => void;
  setEmail: (value: string) => void;
  switchToEmail: () => void;
  switchToPhone: () => void;
  setError: (message: string) => void;
  setOtp: (value: string) => void;
  setPasscode: (value: string) => void;
  setCompletionMessage: (value: string) => void;
}

// ResetPasscodeContext
export const ResetPasscodeContext = createContext<ResetPasscodeContextType | undefined>(undefined);

// Provider component
export const ResetPasscodeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(resetPasscodeReducer, BaseState);

  const value: ResetPasscodeContextType = {
    state,
    setPhoneNumber: (value) =>
      dispatch({ type: actionTypes.SET_PHONE_NUMBER, payload: value }),
    setEmail: (value) =>
      dispatch({ type: actionTypes.SET_EMAIL, payload: value }),
    switchToEmail: () =>
      dispatch({ type: actionTypes.USE_EMAIL_INSTEAD, payload: true }),
    switchToPhone: () =>
      dispatch({ type: actionTypes.USE_PHONE_NUMBER_INSTEAD, payload: true }),
    setError: (message) =>
      dispatch({ type: actionTypes.SET_ERROR, payload: message }),
    setOtp: (value) =>
      dispatch({ type: actionTypes.SET_OTP, payload: value }),
    setPasscode: (value) =>
      dispatch({ type: actionTypes.SET_PASSCODE, payload: value }),
    setCompletionMessage: (value) =>
      dispatch({ type: actionTypes.SET_COMPLETION_MESSAGE, payload: value }),
  };

  return (
    <ResetPasscodeContext.Provider value={value}>
      {children}
    </ResetPasscodeContext.Provider>
  );
};

