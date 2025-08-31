import { type Dispatch, createContext } from 'react';

import type { Action, InitialState } from '.';

const authContext = createContext<{
  state: InitialState;
  dispatch: Dispatch<Action>;
}>({
  state: {} as InitialState,
  dispatch: {} as Dispatch<Action>,
});

export default authContext;
