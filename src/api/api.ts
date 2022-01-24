import { BASE_URL } from "../constants/constants";
import {
  IIngredient,
  IUserLoginRequest,
  IUserSignupRequest,
} from "../services/types/data";

const checkResponse = (response: Response): Promise<any> => {
  // console.log(response);

  if (response.ok) return response.json();
  console.log("error");
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

export const signupApi = (userData: IUserSignupRequest) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
    .then((data) => data);
};

export const loginApi = (userData: IUserLoginRequest) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
    .then((data) => data);
};
