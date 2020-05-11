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
    case 'userRegistrationData':
      return {
        ...state,
        userRegistrationData: action.payload,
      };
    case 'token':
      return {
        ...state,
        token: action.payload,
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
