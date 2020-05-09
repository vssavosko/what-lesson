import {
  ILoadingAction,
  ILoggedInAction,
  IInstallAction,
  IUserAction,
  IUserNameAction,
  IGroupCodeAction,
  IUserTokenAction,
  ISubscribedAction,
  IThemeAction,
} from './globalInterfaces';

export type ActionType =
  | ILoadingAction
  | ILoggedInAction
  | IInstallAction
  | IUserAction
  | IUserNameAction
  | IGroupCodeAction
  | IUserTokenAction
  | ISubscribedAction
  | IThemeAction;

export type UserDataType = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  group: string;
  groupCode: string;
  course: string;
  userAvatar: string;
};

export type ThemesType = {
  mainTextColor: string;
  secondTextColor: string;
  background: string;
  elementBackground: string;
  borderColor: string;
  elementsColor: string;
  elementsColorHover: string;
};
