import { LessonType } from '../../globalTypes';

export interface IProps {
  currentSchedule?: LessonType[];
  hideSchedule: () => void;
}
