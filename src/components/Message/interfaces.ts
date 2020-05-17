export interface IProps {
  message: object;
  lastMessage: boolean;
  isShowStartDate: boolean;
}

export interface IMessage {
  text: string;
  sendingDate: string;
  sendingTime: string;
}
