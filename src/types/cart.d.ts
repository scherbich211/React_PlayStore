export interface ICartItem {
  id: number;
  name: string;
  price: string;
  date: string;
  platform: "PC" | "Playstation 5" | "XBox One";
  permission: Array<"PC" | "Playstation 5" | "XBox One">;
  amount: number;
}

export interface ICartRedux {
  games: Array<ICartItem>;
}
