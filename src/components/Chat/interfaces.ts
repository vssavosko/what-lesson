import { UserRegistrationDataType } from '../../globalTypes';

export interface IProps {
  userRegistrationData: UserRegistrationDataType;
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
