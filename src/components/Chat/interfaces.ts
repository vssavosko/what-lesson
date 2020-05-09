import { UserDataType } from '../../globalTypes';

export interface IProps {
  user: UserDataType;
  theme: string;
}

export interface IMessage {
  text: string;
  sendingDate: string;
  sendingTime: string;
}

export interface IEventInfo {
  target: HTMLInputElement;
  keyCode: number;
}
