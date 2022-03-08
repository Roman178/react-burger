const BASE_URL: string = "https://norma.nomoreparties.space/api";
const WS_URL = "wss://norma.nomoreparties.space/orders";

const BUN: string = "bun";
const SAUCE: string = "sauce";
const MAIN_INGREDIENT: string = "main";

const translate = {
  [BUN]: "Булки",
  [SAUCE]: "Соусы",
  [MAIN_INGREDIENT]: "Начинки",
};

const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const JWT_EXPIRED = "jwt expired";
const SHOULD_BE_AUTH = "You should be authorised";

export {
  BASE_URL,
  WS_URL,
  BUN,
  SAUCE,
  MAIN_INGREDIENT,
  translate,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  JWT_EXPIRED,
  SHOULD_BE_AUTH,
};
