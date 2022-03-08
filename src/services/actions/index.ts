import { TIngredientsActions } from "./ingredients";
import { TCounterActions } from "./counter";
import { TOrderActions } from "./orders";
import { TUserActions } from "./user";
import { TWsActions } from "./ws";

export type TApplicationActions =
  | TIngredientsActions
  | TCounterActions
  | TOrderActions
  | TUserActions
  | TWsActions;
