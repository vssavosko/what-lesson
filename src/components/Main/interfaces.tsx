type UserData = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  group: string;
  course: string;
  userAvatar: string;
};

export interface IStyledProps {
  pb?: string;
}
export interface IProps {
  user: UserData;
}
export interface ILesson {
  id: number;
  time: string;
  lessonName: string;
  place: string;
  teacherName: string;
}
