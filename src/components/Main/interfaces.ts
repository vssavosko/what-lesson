import { UserDataType } from '../../globalTypes';

export interface IProps {
  user: UserDataType;
  theme: string;
}
export interface ILesson {
  id: number;
  time: string;
  lessonName: string;
  place: string;
  teacherName: string;
}
