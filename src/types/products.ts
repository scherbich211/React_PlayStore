import { IGameData } from "./mockStore";

export type TCriteria = "Name" | "Price" | "Rating";
export const criteria: Array<TCriteria> = ["Name", "Price", "Rating"];

export type TType = "Hight to Low" | "Low to Hight";
export const type: Array<TType> = ["Hight to Low", "Low to Hight"];

export type TGenres = "All genres" | "Shooter" | "Arcade" | "Survive";
export const genres: Array<TGenres> = ["All genres", "Shooter", "Arcade", "Survive"];

export type TAge = "All ages" | "3" | "6" | "12" | "18";
export const age: Array<TAge> = ["All ages", "3", "6", "12", "18"];

export interface IFilter {
  selectedCriteria: TCriteria;
  selectedType: TType;
  selectedGenre: TGenres;
  selectedAge: TAge;
}

export interface IProductsRedux {
  games: Array<IGameData>;
  filter: IFilter;
}
