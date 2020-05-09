import { IState } from '../../globalInterfaces';
import { ActionType } from '../../globalTypes';

export const appReducer = (state: IState, action: ActionType): IState => {
  switch (action.type) {
    case 'isLoading':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'isLoggedIn':
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case 'isInstall':
      return {
        ...state,
        isInstall: action.payload,
      };
    case 'user':
      return {
        ...state,
        user: action.payload,
      };
    case 'userName':
      return {
        ...state,
        userName: action.payload,
      };
    case 'groupCode':
      return {
        ...state,
        groupCode: action.payload,
      };
    case 'userToken':
      return {
        ...state,
        userToken: action.payload,
      };
    case 'isSubscribed':
      return {
        ...state,
        isSubscribed: action.payload,
      };
    case 'theme':
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};
