import {
  ILoadingAction,
  ILoggedInAction,
  IInstallAction,
  ISubscribedAction,
  ITokenAction,
  IUserRegistrationAction,
  IUserAction,
  IScheduleAction,
  IStudentsAction,
  IThemeAction,
} from './globalInterfaces';

export type ActionType =
  | ILoadingAction
  | ILoggedInAction
  | IInstallAction
  | ISubscribedAction
  | ITokenAction
  | IUserRegistrationAction
  | IUserAction
  | IScheduleAction
  | IStudentsAction
  | IThemeAction;

export type UserRegistrationType = {
  userName: string;
  groupCode: string;
};

export type UserType = {
  key: string;
  userAvatar: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  course: string;
  group: string;
};

export type ScheduleType = {
  id: number;
  time: string;
  lessonName: string;
  place: string;
  teacherName: string;
};

export type StudentsType = {
  userAvatar: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type ThemeType = {
  mainTextColor: string;
  secondTextColor: string;
  background: string;
  elementBackground: string;
  borderColor: string;
  elementsColor: string;
  elementsColorHover: string;
};

export type LessonType = {
  id: number;
  time: string;
  lessonName: string;
  place: string;
  teacherName: string;
};

export type MessageType = {
  userName: string;
  userAvatar: string;
  messageText: string;
  sendingDate: string;
  sendingTime: string;
};
