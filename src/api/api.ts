import { BASE_URL } from "../constants/constants";
import {
  IIngredient,
  IUserLoginRequest,
  IUserSignupRequest,
} from "../services/types/data";

const checkResponse = (response: Response): Promise<any> => {
  // console.log(response);

  if (response.ok) return response.json();
  return Promise.reject(response);
};

export const fetchIngredients = async () => {
  return fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
    .then(({ data }) => data);
};

export const createOrderApi = async (
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

export const signupApi = async (userData: IUserSignupRequest) => {
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

export const loginApi = async (userData: IUserLoginRequest) => {
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

export const logoutApi = async (refreshToken: string) => {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    body: JSON.stringify({ token: refreshToken }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
    .then((data) => data);
};

export const authAccessTokenApi = async (token: string) => {
  return fetch(`${BASE_URL}/auth/user`, {
    headers: {
      Authorization: token,
    },
  })
    .then(checkResponse)
    .then((data) => data);
};

export const authRefreshTokenApi = async (token: string) => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
    .then((data) => data);
};

export const forgotPassword = async (email: string) => {
  return fetch(`${BASE_URL}/password-reset`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
    .then((data) => data);
};

export const resetPassword = async (resetPasswordData: {
  password: string;
  token: string;
}) => {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    method: "POST",
    body: JSON.stringify(resetPasswordData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
    .then((data) => data);
};
