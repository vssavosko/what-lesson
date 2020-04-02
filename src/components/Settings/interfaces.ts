import { UserData } from '../../globalTypes';

export interface IProps {
  user: UserData;
  theme: string;
  changeTheme: (theme: string) => void;
}
