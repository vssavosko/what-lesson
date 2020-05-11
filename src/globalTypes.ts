import {
  ILoadingAction,
  ILoggedInAction,
  IInstallAction,
  IUserAction,
  IUserRegistrationAction,
  ITokenAction,
  ISubscribedAction,
  IThemeAction,
} from './globalInterfaces';

export type ActionType =
  | ILoadingAction
  | ILoggedInAction
  | IInstallAction
  | IUserAction
  | IUserRegistrationAction
  | ITokenAction
  | ISubscribedAction
  | IThemeAction;

export type UserDataType = {
  key: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  group: string;
  course: string;
  userAvatar: string;
};

export type UserRegistrationDataType = {
  userName: string;
  groupCode: string;
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
