export interface IProps {
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
