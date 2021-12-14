import { BASE_URL } from "../constants/constants";

const checkResponse = (response) => {
  if (response.ok) return response.json();
  return Promise.reject(response);
};

export const fetchIngredients = () => {
  return fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));
};

export const createOrderApi = (ingredients) => {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    body: JSON.stringify(ingredients),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
    .then((data) => data)
    .catch((err) => Promise.reject(err));
};
