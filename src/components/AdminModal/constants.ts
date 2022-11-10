import * as Yup from "yup";

export type TPlatform = Array<"Playstation 5" | "PC" | "XBox One">;

export type FormState = {
  name: string;
  category: string;
  price: string;
  image: string;
};

export interface INewGame {
  imageSrc: string;
  text: string;
  age: string;
  platform: TPlatform;
}

export const inputs: Array<"name" | "category" | "price" | "image"> = ["name", "category", "price", "image"];
export const platfromArr: TPlatform = ["PC", "Playstation 5", "XBox One"];
export const ageArr = ["3+", "6+", "12+", "18+"];

export const schema = Yup.object().shape({
  name: Yup.string().min(3).required(),
  category: Yup.string().required(),
  price: Yup.string()
    .min(0)
    .matches(/(?<!-)(?<!\d)[1-9][0-9]*\d*(?:\.\d{0,2})?/)
    .required(),
  image: Yup.string().required(),
});
