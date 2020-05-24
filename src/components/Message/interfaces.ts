import { MessageType } from '../../globalTypes';

export interface IProps {
  currentDate: string;
  dateСomparison: (sendingDate: string) => boolean;
  message: MessageType;
  lastMessage: boolean;
}
