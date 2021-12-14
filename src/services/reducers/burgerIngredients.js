import * as types from "../actions/actionTypes";

const initialState = {
  items: [],
  bun: null,
  quantity: [],
};

const increaseCounter = ({ quantity, bun }, ingredient) => {
  if (!bun && ingredient.type !== "bun") return [];
  const increasedIngredient = quantity.find((i) => i.id === ingredient._id);

  return ingredient.type === "bun"
    ? [
        ...quantity.filter((i) => i.type !== "bun"),
        { id: ingredient._id, type: ingredient.type, qty: 2 },
      ]
    : increasedIngredient
    ? [
        ...quantity.filter((i) => i.id !== increasedIngredient.id),
        { ...increasedIngredient, qty: increasedIngredient.qty + 1 },
      ]
    : [...quantity, { id: ingredient._id, type: ingredient.type, qty: 1 }];
};

const decreaseCounter = (quantity, ingredient) => {
  const decreasedIngredient = quantity.find((i) => i.id === ingredient._id);

  return decreasedIngredient.qty === 1
    ? [...quantity.filter((i) => i.id !== decreasedIngredient.id)]
    : [
        ...quantity.filter((i) => i.id !== decreasedIngredient.id),
        { ...decreasedIngredient, qty: decreasedIngredient.qty - 1 },
      ];
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_BUN_BURGER: {
      return { ...state, bun: action.bun };
    }
    case types.ADD_INGREDIENT_BURGER: {
      return state.bun
        ? { ...state, items: [...state.items, action.addedIngredient] }
        : state;
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
      return { ...state, items: [], bun: null };
    }
    case types.INCREASE_INGREDIENT_COUNTER: {
      return {
        ...state,
        quantity: increaseCounter(state, action.addedIngredient),
      };
    }
    case types.DECREASE_INGREDIENT_COUNTER: {
      return {
        ...state,
        quantity: decreaseCounter(state.quantity, action.addedIngredient),
      };
    }
    case types.RESET_COUNTER: {
      return {
        ...state,
        quantity: [],
      };
    }
    default:
      return state;
  }
};
