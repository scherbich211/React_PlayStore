export interface IGameData {
  id: number;
  name: string;
  price: string;
  route: string;
  descriptionBack: string;
  age: string;
  permission: Array<"PC" | "Platstation" | "XBox">;
}

export interface IUser {
  id: number;
  login: string;
  password: string;
  description: string;
  profileImage: string;
}

export interface usersJSON {
  users: Array<IUser>;
  authorized: number;
}

export interface gamesJSON {
  games: Array<IGameData>;
}
