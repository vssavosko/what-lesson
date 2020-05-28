import { IChatState } from './interfaces';
import { ChatActionType } from './types';

export const chatReducer = (state: IChatState, action: ChatActionType): IChatState => {
  switch (action.type) {
    case 'textareaData':
      return {
        ...state,
        textareaData: action.payload,
      };
    case 'message':
      return {
        ...state,
        message: action.payload,
      };
    case 'messages':
      return {
        ...state,
        messages: action.payload,
      };
    case 'isLoading':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'error':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
