export interface IFaceCaptureState {
  isLoading: boolean;
  error: string;
  completionMessage: string; //final api call message
}

export const BaseFaceCaptureState: IFaceCaptureState = {
  isLoading: false,
  error: "",
  completionMessage: "",
};
export const actionTypes = {
  SET_LOADING: "SET_LOADING_TO_TRUE",
  SET_ERROR: "SET_ERROR",
  SET_COMPLETION_MESSAGE: "SET_COMPLETION_MESSAGE",
};

export type FaceCaptureAction =
  | { type: typeof actionTypes.SET_LOADING; payload: boolean }
  | { type: typeof actionTypes.SET_ERROR; payload: string }
  | { type: typeof actionTypes.SET_COMPLETION_MESSAGE; payload: string }; //final api call message

/** face capture reducer */
export function faceCaptureReducer(
  state: IFaceCaptureState,
  action: FaceCaptureAction
): IFaceCaptureState {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload as boolean,
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload as string,
      };
    case actionTypes.SET_COMPLETION_MESSAGE:
      return { ...state, completionMessage: action.payload as string };

    default:
      return BaseFaceCaptureState;
  }
}
