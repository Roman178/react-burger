import * as c from "../constants";
import { fetchIngredients } from "../../api/api";
import { IIngredient } from "../types/data";
import { AppDispatch, AppThunk } from "../types";

export interface IGetIngredintsRequestAction {
  readonly type: typeof c.GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredintsSuccessAction {
  readonly type: typeof c.GET_INGREDIENTS_SUCCESS;
  readonly items: IIngredient[];
}

export interface IGetIngredintsFailedAction {
  readonly type: typeof c.GET_INGREDIENTS_FAILED;
}

export interface IAddBunToBurger {
  readonly type: typeof c.ADD_BUN_TO_BURGER;
  readonly bun: IIngredient;
}

export interface IAddIngredientToBurger {
  readonly type: typeof c.ADD_INGREDIENT_TO_BURGER;
  readonly addedIngredient: IIngredient;
}

export interface IRemoveIngredientFromBurger {
  readonly type: typeof c.REMOVE_INGREDIENT_FROM_BURGER;
  readonly removedCreatedAt: IIngredient["createdAt"];
}

export interface ISortIngredientsBurger {
  readonly type: typeof c.SORT_INGREDIENTS_BURGER;
  readonly sortedIngredients: any;
}

export interface IRemoveAllIngredientsFromBurger {
  readonly type: typeof c.REMOVE_ALL_INGREDIENTS_FROM_BURGER;
}

export interface ISetCurrentIngredient {
  readonly type: typeof c.SET_CURRENT_INGREDIENT;
  readonly currentIngredient: IIngredient;
}

export interface IRemoveCurrentIngredient {
  readonly type: typeof c.REMOVE_CURRENT_INGREDIENT;
}

export type TIngredientsActions =
  | IGetIngredintsRequestAction
  | IGetIngredintsSuccessAction
  | IGetIngredintsFailedAction
  | IAddBunToBurger
  | IAddIngredientToBurger
  | IRemoveIngredientFromBurger
  | ISortIngredientsBurger
  | IRemoveAllIngredientsFromBurger
  | ISetCurrentIngredient
  | IRemoveCurrentIngredient;
// | AppThunk;

export const getIngredintsRequestAction = (): IGetIngredintsRequestAction => ({
  type: c.GET_INGREDIENTS_REQUEST,
});

export const getIngredintsSuccessAction = (
  items: IIngredient[]
): IGetIngredintsSuccessAction => ({
  type: c.GET_INGREDIENTS_SUCCESS,
  items,
});

export const getIngredintsFailedAction = (): IGetIngredintsFailedAction => ({
  type: c.GET_INGREDIENTS_FAILED,
});

export const addBunToBurger = (bun: IIngredient): IAddBunToBurger => ({
  type: c.ADD_BUN_TO_BURGER,
  bun,
});

export const addIngredientToBurger = (
  ingredient: IIngredient
): IAddIngredientToBurger => ({
  type: c.ADD_INGREDIENT_TO_BURGER,
  addedIngredient: ingredient,
});

export const removeIngredientFromBurger = (
  createdAt: IIngredient["createdAt"]
): IRemoveIngredientFromBurger => ({
  type: c.REMOVE_INGREDIENT_FROM_BURGER,
  removedCreatedAt: createdAt,
});

export const sortIngredientsBurger = (
  sortedIngredients: any
): ISortIngredientsBurger => ({
  type: c.SORT_INGREDIENTS_BURGER,
  sortedIngredients,
});

export const removeAllIngredientsFromBurger =
  (): IRemoveAllIngredientsFromBurger => ({
    type: c.REMOVE_ALL_INGREDIENTS_FROM_BURGER,
  });

export const setCurrentIngredient = (
  ingredient: IIngredient
): ISetCurrentIngredient => ({
  type: c.SET_CURRENT_INGREDIENT,
  currentIngredient: ingredient,
});

export const removeCurrentIngredient = (): IRemoveCurrentIngredient => ({
  type: c.REMOVE_CURRENT_INGREDIENT,
});

export const getIngredientsThunk: AppThunk = () => {
  return async function (dispatch: AppDispatch) {
    dispatch(getIngredintsRequestAction());
    try {
      const items = await fetchIngredients();
      dispatch(getIngredintsSuccessAction(items));
    } catch (err: any) {
      dispatch(getIngredintsFailedAction());
      console.error("Error in getIngredients thunk ", err.status);
    }
  };
};
