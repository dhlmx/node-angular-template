export interface IUser {
  _id: string;
  __v: number;
  email: string;
  name: string;
  password: string;
  profileImage: string;
  userName: string;
}

export const IUSER_DEFAUT = {
  _id: '',
  __v: 0,
  email: '',
  name: '',
  password: '',
  profileImage: '',
  userName: ''
} as IUser;
