import { number, string } from "prop-types";

const ingredientType = {
  _id: string.isRequired,
  name: string.isRequired,
  type: string.isRequired,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number.isRequired,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  createdAt: number,
};

export { ingredientType };
