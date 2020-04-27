import { UserData } from '../../globalTypes';

export interface IProps {
  user: UserData;
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
