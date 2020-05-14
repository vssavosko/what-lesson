import { UserRegistrationType, UserType, ScheduleType, ThemeType } from './globalTypes';

export interface IState {
  isLoading: boolean;
  isLoggedIn: boolean;
  isInstall: boolean;
  isSubscribed: boolean;
  token: string;
  userRegistrationData: UserRegistrationType;
  user: UserType;
  schedule: ScheduleType[][];
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

export interface ISubscribedAction {
  type: 'isSubscribed';
  payload: boolean;
}

export interface ITokenAction {
  type: 'token';
  payload: string;
}

export interface IUserRegistrationAction {
  type: 'userRegistrationData';
  payload: UserRegistrationType;
}

export interface IUserAction {
  type: 'user';
  payload: UserType;
}

export interface IScheduleAction {
  type: 'schedule';
  payload: ScheduleType[][];
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
  theme: ThemeType;
}
