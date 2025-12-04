import { useMemo, useReducer } from "react";

import authContext from "./context";
import { authReducer } from "./reducer";
import {  intialAuthContextState } from "./initialState";


export type Action = { type: string; payload: any };

export default function AuthContextProvider({ children }: { children: any }) {
  const [state, dispatch] = useReducer(authReducer, intialAuthContextState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
