import { UserDataType, UserRegistrationDataType } from '../../globalTypes';

export interface IProps {
  user: UserDataType;
  userRegistrationData: UserRegistrationDataType;
  userToken: string;
  isSubscribed: boolean;
  theme: string;
}

export interface ICheckUserData {
  [key: string]: string | boolean | number;
}
