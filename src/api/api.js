import { BASE_URL } from "../constants/constants";

export const fetchIngredients = async () => {
  return fetch(BASE_URL)
    .then((res) => {
      console.log(res);

      if (res.ok) return res.json();
      return Promise.reject();
    })
    .then(({ data }) => data)
    .catch((err) => err);

  // try {
  //   const res = await fetch(BASE_URL);
  //   const { data } = await res.json();
  //   return data;
  // } catch (error) {
  //   return new Error(error);
  // }
};
