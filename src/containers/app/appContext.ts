import { createContext, Dispatch } from 'react';

import { ActionType } from '../../globalTypes';

export const Context = createContext({} as { dispatch: Dispatch<ActionType> });
