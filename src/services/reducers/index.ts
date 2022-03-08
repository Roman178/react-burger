import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { burgerIngredientsReducer } from "./burgerIngredients";
import { orderReducer } from "./order";
import { currentIngredientReducer } from "./currentIngredient";
import { userReducer } from "./user";
import { wsReducer } from "./ws";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerIngredients: burgerIngredientsReducer,
  order: orderReducer,
  currentIngredient: currentIngredientReducer,
  user: userReducer,
  ws: wsReducer,
});
