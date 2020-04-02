import { UserData } from '../../globalTypes';

export interface IProps {
  user: UserData;
  theme: string;
}
export interface ILesson {
  id: number;
  time: string;
  lessonName: string;
  place: string;
  teacherName: string;
}
