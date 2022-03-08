import * as at from "../action-types";
import { IIngredient } from "../types/data";
import { TIngredientsActions } from "../actions/ingredients";

type TCurrentIngredientState = IIngredient | {};

const currentIngredientInitialState: TCurrentIngredientState = {};

export const currentIngredientReducer = (
  state = currentIngredientInitialState,
  action: TIngredientsActions
) => {
  switch (action.type) {
    case at.SET_CURRENT_INGREDIENT: {
      return action.currentIngredient;
    }
    case at.REMOVE_CURRENT_INGREDIENT: {
      return currentIngredientInitialState;
    }
    default:
      return state;
  }
};
