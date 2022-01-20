import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { burgerIngredientsReducer } from "./burgerIngredients";
import { orderReducer } from "./order";
import { currentIngredientReducer } from "./currentIngredient";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerIngredients: burgerIngredientsReducer,
  order: orderReducer,
  currentIngredient: currentIngredientReducer,
});
