export interface IGameData {
  id: number;
  name: string;
  price: string;
  route: string;
  descriptionBack: string;
  age: string;
  permission: Array<"PC" | "Platstation" | "XBox">;
}

export interface IGamesData {
  games: Array<IGameData>;
}
