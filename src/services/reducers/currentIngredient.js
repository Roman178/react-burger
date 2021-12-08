import * as types from "../actions/actionTypes";

const initialState = {};

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_INGREDIENT: {
      return action.currentIngredient;
    }
    default:
      return state;
  }
};
