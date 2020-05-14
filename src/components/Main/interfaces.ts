import { UserType, ScheduleType } from '../../globalTypes';

export interface IProps {
  user: UserType;
  schedule: ScheduleType[][];
  theme: string;
}
