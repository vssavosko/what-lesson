import { IState } from '../../globalInterfaces';
import { ActionType } from '../../globalTypes';

export const appReducer = (state: IState, action: ActionType): IState => {
  switch (action.type) {
    case 'host':
      return {
        ...state,
        host: action.payload,
      };
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
    case 'isSubscribed':
      return {
        ...state,
        isSubscribed: action.payload,
      };
    case 'token':
      return {
        ...state,
        token: action.payload,
      };
    case 'userRegistrationData':
      return {
        ...state,
        userRegistrationData: action.payload,
      };
    case 'user':
      return {
        ...state,
        user: action.payload,
      };
    case 'schedule':
      return {
        ...state,
        schedule: action.payload,
      };
    case 'listOfStudents':
      return {
        ...state,
        listOfStudents: action.payload,
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
