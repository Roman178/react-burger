import { BASE_URL } from "../constants/constants";

export const fetchIngredients = async () => {
  try {
    const res = await fetch(BASE_URL);
    const { data } = await res.json();
    return data;
  } catch (error) {
    return new Error(error);
  }
};
