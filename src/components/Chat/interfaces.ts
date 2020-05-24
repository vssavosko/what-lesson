import { UserRegistrationType, MessageType } from '../../globalTypes';

export interface IStyledProps {
  positioning: string;
}
export interface IProps {
  userRegistrationData: UserRegistrationType;
  userAvatar: string;
}

export interface ITextareaData {
  target: HTMLTextAreaElement;
  keyCode: number;
}

export interface IChatState {
  currentDate: string;
  textareaData: object;
  message: string;
  messages: MessageType[];
  isLoading: boolean;
}

export interface ITextareaAction {
  type: 'textareaData';
  payload: object;
}

export interface IMessageAction {
  type: 'message';
  payload: string;
}

export interface IMessagesAction {
  type: 'messages';
  payload: MessageType[];
}

export interface ILoadingAction {
  type: 'isLoading';
  payload: boolean;
}
