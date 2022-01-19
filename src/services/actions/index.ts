import { TIngredientsActions } from "./ingredients";
import { TCounterActions } from "./counter";
import { TOrderActions } from "./orders";

export type TApplicationActions =
  | TIngredientsActions
  | TCounterActions
  | TOrderActions;
