import * as at from "../action-types";
import { IIngredient } from "../types/data";
import { TIngredientsActions } from "../actions/ingredients";

type TIngredientsState = {
  items: ReadonlyArray<IIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
};

const ingredientsInitialState: TIngredientsState = {
  items: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (
  state = ingredientsInitialState,
  action: TIngredientsActions
) => {
  switch (action.type) {
    case at.GET_INGREDIENTS_REQUEST: {
      return { ...state, ingredientsRequest: true };
    }
    case at.GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        items: action.items,
      };
    }
    case at.GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsRequest: false, ingredientsFailed: true };
    }
    default:
      return state;
  }
};
