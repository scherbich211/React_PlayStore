import { IUser } from "./mockStore";

export interface IUserRedux {
  isSignedIn: boolean;
  user: IUser;
  isAdmin: boolean;
}
