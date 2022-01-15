import * as types from "../actions/actionTypes";

const initialState = {
  items: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INGREDIENTS_REQUEST: {
      return { ...state, ingredientsRequest: true };
    }
    case types.GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        items: action.items,
      };
    }
    case types.GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsRequest: false, ingredientsFailed: true };
    }
    default:
      return state;
  }
};
