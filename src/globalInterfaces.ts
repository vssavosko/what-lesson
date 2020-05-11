import { UserDataType, UserRegistrationDataType, ThemesType } from './globalTypes';

export interface IState {
  isLoading: boolean;
  isLoggedIn: boolean;
  isInstall: boolean;
  user: UserDataType;
  userRegistrationData: UserRegistrationDataType;
  token: string;
  isSubscribed: boolean;
  theme: string;
}

export interface ILoadingAction {
  type: 'isLoading';
  payload: boolean;
}

export interface ILoggedInAction {
  type: 'isLoggedIn';
  payload: boolean;
}

export interface IInstallAction {
  type: 'isInstall';
  payload: boolean;
}

export interface IUserAction {
  type: 'user';
  payload: UserDataType;
}

export interface IUserRegistrationAction {
  type: 'userRegistrationData';
  payload: UserRegistrationDataType;
}

export interface ITokenAction {
  type: 'token';
  payload: string;
}

export interface ISubscribedAction {
  type: 'isSubscribed';
  payload: boolean;
}

export interface IThemeAction {
  type: 'theme';
  payload: string;
}

export interface ISizes {
  width?: string;
  height?: string;
}

export interface IPosition {
  right?: string;
  top?: string;
  left?: string;
  bottom?: string;
}

export interface IPadding {
  padding?: string;
  pr?: string;
  pt?: string;
  pl?: string;
  pb?: string;
}

export interface IMargin {
  margin?: string;
  mr?: string;
  mt?: string;
  ml?: string;
  mb?: string;
}

export interface ITheme {
  theme: ThemesType;
}
