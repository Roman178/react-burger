import { BASE_URL } from "../constants/constants";

export const fetchIngredients = () => {
  return fetch(BASE_URL)
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res);
    })
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));
};

export const createOrderApi = (ingredients) => {
  return fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(ingredients),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res);
    })
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));
};
