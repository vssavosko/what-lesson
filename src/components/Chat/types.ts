import {
  ITextareaAction,
  IMessageAction,
  IMessagesAction,
  ILoadingAction,
  IErrorAction,
} from './interfaces';

export type ChatActionType =
  | ITextareaAction
  | IMessageAction
  | IMessagesAction
  | ILoadingAction
  | IErrorAction;
