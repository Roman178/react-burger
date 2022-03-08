import * as at from "../action-types";
import { fetchIngredients } from "../../api/api";
import { IIngredient } from "../types/data";
import { AppDispatch, AppThunk } from "../types";

export interface IGetIngredintsRequestAction {
  readonly type: typeof at.GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredintsSuccessAction {
  readonly type: typeof at.GET_INGREDIENTS_SUCCESS;
  readonly items: IIngredient[];
}

export interface IGetIngredintsFailedAction {
  readonly type: typeof at.GET_INGREDIENTS_FAILED;
}

export interface IAddBunToBurger {
  readonly type: typeof at.ADD_BUN_TO_BURGER;
  readonly bun: IIngredient;
}

export interface IAddIngredientToBurger {
  readonly type: typeof at.ADD_INGREDIENT_TO_BURGER;
  readonly addedIngredient: IIngredient;
}

export interface IRemoveIngredientFromBurger {
  readonly type: typeof at.REMOVE_INGREDIENT_FROM_BURGER;
  readonly removedCreatedAt: IIngredient["createdAt"];
}

export interface ISortIngredientsBurger {
  readonly type: typeof at.SORT_INGREDIENTS_BURGER;
  readonly sortedIngredients: any;
}

export interface IRemoveAllIngredientsFromBurger {
  readonly type: typeof at.REMOVE_ALL_INGREDIENTS_FROM_BURGER;
}

export interface ISetCurrentIngredient {
  readonly type: typeof at.SET_CURRENT_INGREDIENT;
  readonly currentIngredient: IIngredient;
}

export interface IRemoveCurrentIngredient {
  readonly type: typeof at.REMOVE_CURRENT_INGREDIENT;
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
  type: at.GET_INGREDIENTS_REQUEST,
});

export const getIngredintsSuccessAction = (
  items: IIngredient[]
): IGetIngredintsSuccessAction => ({
  type: at.GET_INGREDIENTS_SUCCESS,
  items,
});

export const getIngredintsFailedAction = (): IGetIngredintsFailedAction => ({
  type: at.GET_INGREDIENTS_FAILED,
});

export const addBunToBurger = (bun: IIngredient): IAddBunToBurger => ({
  type: at.ADD_BUN_TO_BURGER,
  bun,
});

export const addIngredientToBurger = (
  ingredient: IIngredient
): IAddIngredientToBurger => ({
  type: at.ADD_INGREDIENT_TO_BURGER,
  addedIngredient: ingredient,
});

export const removeIngredientFromBurger = (
  createdAt: IIngredient["createdAt"]
): IRemoveIngredientFromBurger => ({
  type: at.REMOVE_INGREDIENT_FROM_BURGER,
  removedCreatedAt: createdAt,
});

export const sortIngredientsBurger = (
  sortedIngredients: any
): ISortIngredientsBurger => ({
  type: at.SORT_INGREDIENTS_BURGER,
  sortedIngredients,
});

export const removeAllIngredientsFromBurger =
  (): IRemoveAllIngredientsFromBurger => ({
    type: at.REMOVE_ALL_INGREDIENTS_FROM_BURGER,
  });

export const setCurrentIngredient = (
  ingredient: IIngredient
): ISetCurrentIngredient => ({
  type: at.SET_CURRENT_INGREDIENT,
  currentIngredient: ingredient,
});

export const removeCurrentIngredient = (): IRemoveCurrentIngredient => ({
  type: at.REMOVE_CURRENT_INGREDIENT,
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
