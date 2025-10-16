import { string } from "yup";

interface IInitialState {
  phoneNumber: string | null;
  email: string | null;
  useEmailInstead: boolean;
  usePhoneNumberInstead: boolean;
  error: string | null;

}
/** Always reset to base state to avoid carrying over stale input
 */
export const BaseState: IInitialState = {
  phoneNumber: null,
  email: null,
  useEmailInstead: false,
  usePhoneNumberInstead: true,
  error: null
};
export const actionTypes = {
  SET_PHONE_NUMBER: "SET_PHONE_NUMBER",
  SET_EMAIL: "SET_EMAIL",
  USE_EMAIL_INSTEAD: "USE_EMAIL_INSTEAD",
  USE_PHONE_NUMBER_INSTEAD: "USE_PHONE_NUMBER_INSTEAD",
 SET_ERROR: "SET_ERROR",

};

type Action =
  | { type: typeof actionTypes.SET_PHONE_NUMBER; payload: string }
  | { type: typeof actionTypes.SET_EMAIL; payload: string }
  | { type: typeof actionTypes.USE_EMAIL_INSTEAD; payload: boolean }
  | { type: typeof actionTypes.USE_PHONE_NUMBER_INSTEAD; payload: boolean }
  | { type: typeof actionTypes.SET_ERROR; payload: string };

/** reset passcode reducer */
export function resetPasscodeReducer(
  state: IInitialState,
  action: Action
): IInitialState {
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



    default:
      return state;
  }
}
