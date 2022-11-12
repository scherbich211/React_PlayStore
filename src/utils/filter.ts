import { IGameData } from "@/types/mockStore";
import { IFilter } from "@/types/products";

enum ECriteria {
  "Name" = "name",
  "Price" = "price",
  "Rating" = "rating",
}

export const heightToLow = (values: Array<IGameData>, filter: IFilter) => {
  if (filter.selectedType === "Hight to Low") {
    if (filter.selectedCriteria === "Price" || filter.selectedCriteria === "Rating") {
      return values.sort(
        (a, b) => Number(b[ECriteria[filter.selectedCriteria]]) - Number(a[ECriteria[filter.selectedCriteria]])
      );
    }
    if (filter.selectedCriteria === "Name") {
      return values.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }
  }
  return values;
};

export const lowToHight = (values: Array<IGameData>, filter: IFilter) => {
  if (filter.selectedType === "Low to Hight") {
    if (filter.selectedCriteria === "Price" || filter.selectedCriteria === "Rating") {
      return values.sort(
        (a, b) => Number(a[ECriteria[filter.selectedCriteria]]) - Number(b[ECriteria[filter.selectedCriteria]])
      );
    }
    if (filter.selectedCriteria === "Name") {
      return values.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameB < nameA) {
          return -1;
        }
        if (nameB > nameA) {
          return 1;
        }
        return 0;
      });
    }
  }
  return values;
};

export const filterGenres = (values: Array<IGameData>, filter: IFilter) => {
  if (filter.selectedGenre !== "All genres") {
    return values.filter((el) => el.genre === filter.selectedGenre);
  }
  return values;
};
export const filterAge = (values: Array<IGameData>, filter: IFilter) => {
  if (filter.selectedAge !== "All ages") {
    return values.filter((el) => el.age >= filter.selectedAge);
  }
  return values;
};
