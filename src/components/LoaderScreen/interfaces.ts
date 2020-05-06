import { UserData } from '../../globalTypes';

export interface IProps {
  loggedIn: () => void;
  changeUserData: (userData: UserData) => void;
  stopLoading: () => void;
}
