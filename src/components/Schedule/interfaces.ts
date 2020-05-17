type Lesson = {
  id: number;
  time: string;
  lessonName: string;
  place: string;
  teacherName: string;
};

export interface IProps {
  currentSchedule?: Lesson[];
  hideSchedule: () => void;
}
