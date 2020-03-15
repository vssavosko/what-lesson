type Lesson = {
  id: number;
  time: string;
  lessonName: string;
  place: string;
  teacherName: string;
};

export interface IProps {
  currentSchedule?: Array<Lesson>;
  hideSchedule: () => void;
}

export interface IStyledProps {
  padding?: string;
  top?: string;
  height?: string;
}
