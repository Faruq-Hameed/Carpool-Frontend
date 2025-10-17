export interface IInitialState {
  phoneNumber: string | null;
  email: string | null;
  useEmailInstead: boolean;
  usePhoneNumberInstead: boolean;
  error: string | null;
  otp: string, //otp received by user
  passcode: string; //to be sent with otp
  completionMessage: string; //final api call message
}
/** Always reset to base state to avoid carrying over stale input
 */
export const BaseState: IInitialState = {
  phoneNumber: null,
  email: null,
  useEmailInstead: false,
  usePhoneNumberInstead: true,
  error: null,
  otp: "",
  passcode: "",
  completionMessage: "",
};
export const actionTypes = {
  SET_PHONE_NUMBER: "SET_PHONE_NUMBER",
  SET_EMAIL: "SET_EMAIL",
  USE_EMAIL_INSTEAD: "USE_EMAIL_INSTEAD",
  USE_PHONE_NUMBER_INSTEAD: "USE_PHONE_NUMBER_INSTEAD",
  SET_ERROR: "SET_ERROR",
  SET_OTP: "SET_OTP",
  SET_PASSCODE: "SET_PASSCODE",
  SET_COMPLETION_MESSAGE: "SET_COMPLETION_MESSAGE",
};

export type Action =
  | { type: typeof actionTypes.SET_PHONE_NUMBER; payload: string }
  | { type: typeof actionTypes.SET_EMAIL; payload: string }
  | { type: typeof actionTypes.USE_EMAIL_INSTEAD; payload: boolean }
  | { type: typeof actionTypes.USE_PHONE_NUMBER_INSTEAD; payload: boolean }
  | { type: typeof actionTypes.SET_ERROR; payload: string }
  | { type: typeof actionTypes.SET_OTP; payload: string }
  | { type: typeof actionTypes.SET_PASSCODE; payload: string } // ensure payload is string
  | { type: typeof actionTypes.SET_COMPLETION_MESSAGE; payload: string }; //final api call message

/** reset passcode reducer */
export function resetPasscodeReducer(
  state: IInitialState,
  action: Action
): IInitialState {
  console.log({state})
  switch (action.type) {
    case actionTypes.SET_PHONE_NUMBER:
      return { ...BaseState, phoneNumber: action.payload as string };

    case actionTypes.SET_EMAIL:
      return {
        ...BaseState,
        usePhoneNumberInstead: false,
        useEmailInstead: true,
        email: action.payload as string,
      };

    case actionTypes.USE_EMAIL_INSTEAD:
      return {
        ...BaseState,
        useEmailInstead: true,
        usePhoneNumberInstead: false,
      };

    case actionTypes.USE_PHONE_NUMBER_INSTEAD:
      return {
        ...BaseState,
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload as string,
      };
       case actionTypes.SET_OTP:
      return {
        ...state,
        otp: action.payload as string,
      };
    case actionTypes.SET_PASSCODE: 
      return { ...state, passcode: action.payload as string };
    case actionTypes.SET_COMPLETION_MESSAGE:
      return { ...BaseState, completionMessage: action.payload as string };

    default:
      return state;
  }
}
