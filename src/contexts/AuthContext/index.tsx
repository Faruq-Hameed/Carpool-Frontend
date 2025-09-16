import { useMemo, useReducer } from "react";

import authContext from "./context";
import { authReducer } from "./reducer";
// import { User } from '@/models/user';
export interface User {
  //this should be  import { User } from '@/models/user'
  id: string;
  isVerified: boolean;
  firstName: string;
  lastName: string;
}
const intialState = {
  currentUser: {
    id: "", //place holder
    isVerified: false,
    firstName:"",
    lastName:"",
  } as User,
  isLoggedIn: false,
  token: null,
};
export type InitialState = typeof intialState;

export type Action = { type: string; payload: any };

export default function AuthContextProvider({ children }: { children: any }) {
  const [state, dispatch] = useReducer(authReducer, intialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
