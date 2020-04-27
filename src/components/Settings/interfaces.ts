import { UserData } from '../../globalTypes';

export interface IProps {
  user: UserData;
  userToken: string;
  theme: string;
  changeTheme: (theme: string) => void;
}
