import * as c from "../constants";
import { IIngredient } from "../types/data";

export interface IIncreaseIngredientCounter {
  readonly type: typeof c.INCREASE_INGREDIENT_COUNTER;
  addedIngredient: IIngredient;
}

export interface IDecreaseIngredientCounter {
  readonly type: typeof c.DECREASE_INGREDIENT_COUNTER;
  addedIngredient: IIngredient;
}

export interface IResetCounter {
  readonly type: typeof c.RESET_COUNTER;
}

export type TCounterActions =
  | IIncreaseIngredientCounter
  | IDecreaseIngredientCounter
  | IResetCounter;

export const increaseIngredientCounter = (
  ingredient: IIngredient
): IIncreaseIngredientCounter => ({
  type: c.INCREASE_INGREDIENT_COUNTER,
  addedIngredient: ingredient,
});

export const decreaseIngredientCounter = (
  ingredient: IIngredient
): IDecreaseIngredientCounter => ({
  type: c.DECREASE_INGREDIENT_COUNTER,
  addedIngredient: ingredient,
});

export const resetCounter = (): IResetCounter => ({
  type: c.RESET_COUNTER,
});
