export interface IGameData {
  id: number;
  name: string;
  price: string;
  genre: string;
  route: string;
  rating: number;
  descriptionBack: string;
  age: string;
  permission: Array<"PC" | "Playstation 5" | "XBox One">;
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


export interface dataSearchProducts {
  screen: string;
  text: string;
}
