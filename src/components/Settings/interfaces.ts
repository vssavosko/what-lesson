import { UserDataType } from '../../globalTypes';

export interface IProps {
  user: UserDataType;
  userToken: string;
  isSubscribed: boolean;
  theme: string;
}
