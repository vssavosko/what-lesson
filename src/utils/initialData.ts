import { UserRegistrationType, UserType, ScheduleType, StudentsType } from '../globalTypes';

const initialSubscribe = (): boolean => !!localStorage.getItem('isSubscribed');
const initialUserRegistrationData: UserRegistrationType = {
  userName: '',
  groupCode: '',
};
const initialUser: UserType = {
  key: '',
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

export const initialState = {
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
