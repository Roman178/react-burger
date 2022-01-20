import { BASE_URL } from "../constants/constants";
import { IIngredient } from "../services/types/data";

const checkResponse = (response: Response): Promise<any> => {
  if (response.ok) return response.json();
  return Promise.reject(response);
};

export const fetchIngredients = () => {
  return fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
    .then(({ data }) => data);
};

export const createOrderApi = (
  ingredients: Array<IIngredient["_id"]>
): Promise<any> => {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    body: JSON.stringify(ingredients),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
    .then((data) => data);
};
