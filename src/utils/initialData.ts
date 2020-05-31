import {
  UserRegistrationType,
  UserType,
  ScheduleType,
  StudentsType,
  MessageType,
} from '../globalTypes';

const initialSubscribe = (): boolean => !!localStorage.getItem('isSubscribed');
const initialUserRegistrationData: UserRegistrationType = {
  userName: '',
  groupCode: '',
};
const initialUser: UserType = {
  key: '',
  role: '',
  userAvatar: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  course: '',
  group: '',
};
const initialSchedule: ScheduleType[][] = [
  [
    {
      id: 0,
      time: '',
      lessonName: '',
      place: '',
      teacherName: '',
    },
  ],
];
const initialListOfStudents: StudentsType[] = [
  {
    userAvatar: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  },
];
const initialTheme = (): string => localStorage.getItem('theme') || 'light';
const initialCurrentDate = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate(),
).toISOString();
const initialMessages: MessageType[] = [
  {
    userName: '',
    userAvatar: '',
    messageText: '',
    sendingDate: '',
    sendingTime: '',
  },
];

export const initialState = {
  host: '',
  isLoading: true,
  isLoggedIn: false,
  isInstall: false,
  isSubscribed: initialSubscribe(),
  token: '',
  userRegistrationData: initialUserRegistrationData,
  user: initialUser,
  schedule: initialSchedule,
  listOfStudents: initialListOfStudents,
  theme: initialTheme(),
};

export const initialChatState = {
  currentDate: initialCurrentDate,
  textareaData: {},
  message: '',
  messages: initialMessages,
  isLoading: true,
  error: '',
};
