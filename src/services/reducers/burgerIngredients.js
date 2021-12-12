import * as types from "../actions/actionTypes";

const initialState = {
  items: [],
  bun: {},
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_BUN_BURGER: {
      return { ...state, bun: action.bun };
    }
    case types.ADD_INGREDIENT_BURGER: {
      return { ...state, items: [...state.items, action.addedIngredient] };
    }
    case types.REMOVE_INGREDIENT_BURGER: {
      return {
        ...state,
        items: [...state.items].filter(
          (item) => item.createdAt !== action.removedCreatedAt
        ),
      };
    }
    case types.SORT_INGREDIENTS_BURGER: {
      return { ...state, items: action.sortedIngredients };
    }
    case types.REMOVE_ALL_INGREDIENTS_BURGER: {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
};
