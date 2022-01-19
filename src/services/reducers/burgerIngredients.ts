import * as c from "../constants";
import { IIngredient } from "../types/data";
import { TIngredientsActions } from "../actions/ingredients";
import { TCounterActions } from "../actions/counter";

export interface IQuantity {
  id: string;
  type: string;
  qty: number;
}

type TBurgerIngredientsState = {
  items: ReadonlyArray<IIngredient>;
  bun: null | IIngredient;
  quantity: Array<IQuantity>;
};

const burgerIngredientsInitialState: TBurgerIngredientsState = {
  items: [],
  bun: null,
  quantity: [],
};

const increaseCounter = (
  { quantity, bun }: TBurgerIngredientsState,
  ingredient: IIngredient
) => {
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

const decreaseCounter = (quantity: Array<any>, ingredient: IIngredient) => {
  const decreasedIngredient = quantity.find(
    (i: IQuantity) => i.id === ingredient._id
  );

  return decreasedIngredient!.qty === 1
    ? [...quantity.filter((i: IQuantity) => i.id !== decreasedIngredient!.id)]
    : [
        ...quantity.filter((i: IQuantity) => i.id !== decreasedIngredient!.id),
        { ...decreasedIngredient, qty: decreasedIngredient!.qty - 1 },
      ];
};

export const burgerIngredientsReducer = (
  state = burgerIngredientsInitialState,
  action: TIngredientsActions | TCounterActions
) => {
  switch (action.type) {
    case c.ADD_BUN_TO_BURGER: {
      return { ...state, bun: action.bun };
    }
    case c.ADD_INGREDIENT_TO_BURGER: {
      return state.bun
        ? { ...state, items: [...state.items, action.addedIngredient] }
        : state;
    }
    case c.REMOVE_INGREDIENT_FROM_BURGER: {
      return {
        ...state,
        items: [...state.items].filter(
          (item) => item.createdAt !== action.removedCreatedAt
        ),
      };
    }
    case c.SORT_INGREDIENTS_BURGER: {
      return { ...state, items: action.sortedIngredients };
    }
    case c.REMOVE_ALL_INGREDIENTS_FROM_BURGER: {
      return { ...state, items: [], bun: null };
    }
    case c.INCREASE_INGREDIENT_COUNTER: {
      return {
        ...state,
        quantity: increaseCounter(state, action.addedIngredient),
      };
    }
    case c.DECREASE_INGREDIENT_COUNTER: {
      return {
        ...state,
        quantity: decreaseCounter(state.quantity, action.addedIngredient),
      };
    }
    case c.RESET_COUNTER: {
      return {
        ...state,
        quantity: [],
      };
    }
    default:
      return state;
  }
};
