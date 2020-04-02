export interface IProps {
  message: object;
  lastMessage: boolean;
  isShowStartDate: boolean;
  theme: string;
}

export interface IMessage {
  text: string;
  sendingDate: string;
  sendingTime: string;
}
