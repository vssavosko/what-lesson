import { UserRegistrationType, UserType, ScheduleType } from '../../globalTypes';

export interface IProps {
  isSubscribed: boolean;
  userToken: string;
  userRegistrationData: UserRegistrationType;
  user: UserType;
  theme: string;
}

export interface ICheckUserData {
  [key: string]: string | boolean | number | ScheduleType[][];
}
