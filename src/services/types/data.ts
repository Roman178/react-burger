export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  createdAt?: number;
}

export interface IOrder {
  success?: boolean;
  name?: string;
  order?: {
    number: number;
  };
}

export interface IOrderWsResponse {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export interface IUserSignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken?: string;
  refreshToken?: string;
}

export type IUserTokenResponse = Omit<
  IUserLoginResponse,
  "accessToken" | "refreshToken"
>;

export interface ITokensResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}
