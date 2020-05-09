import { UserDataType, ThemesType } from './globalTypes';

export interface IState {
  isLoading: boolean;
  isLoggedIn: boolean;
  isInstall: boolean;
  user: UserDataType;
  userName: string;
  groupCode: string;
  userToken: string;
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

export interface IUserNameAction {
  type: 'userName';
  payload: string;
}

export interface IGroupCodeAction {
  type: 'groupCode';
  payload: string;
}

export interface IUserTokenAction {
  type: 'userToken';
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
