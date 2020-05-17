import { LessonType } from '../../globalTypes';

export interface IProps {
  lesson: LessonType;
  isFirstLesson: boolean;
  isLastLesson: boolean;
}
