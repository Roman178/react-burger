import * as at from "../action-types";
import { IIngredient } from "../types/data";

export interface IIncreaseIngredientCounter {
  readonly type: typeof at.INCREASE_INGREDIENT_COUNTER;
  addedIngredient: IIngredient;
}

export interface IDecreaseIngredientCounter {
  readonly type: typeof at.DECREASE_INGREDIENT_COUNTER;
  addedIngredient: IIngredient;
}

export interface IResetCounter {
  readonly type: typeof at.RESET_COUNTER;
}

export type TCounterActions =
  | IIncreaseIngredientCounter
  | IDecreaseIngredientCounter
  | IResetCounter;

export const increaseIngredientCounter = (
  ingredient: IIngredient
): IIncreaseIngredientCounter => ({
  type: at.INCREASE_INGREDIENT_COUNTER,
  addedIngredient: ingredient,
});

export const decreaseIngredientCounter = (
  ingredient: IIngredient
): IDecreaseIngredientCounter => ({
  type: at.DECREASE_INGREDIENT_COUNTER,
  addedIngredient: ingredient,
});

export const resetCounter = (): IResetCounter => ({
  type: at.RESET_COUNTER,
});
