type UserData = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  group: string;
  course: string;
  userAvatar: string;
};

export interface IStyledProps {
  mb?: string;
}
export interface IProps {
  user: UserData;
}
