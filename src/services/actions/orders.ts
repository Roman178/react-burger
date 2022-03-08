import * as at from "../action-types";
import { createOrderApi } from "../../api/api";
import { AppDispatch, AppThunk } from "../types";
import { IIngredient, IOrder } from "../types/data";

export interface ICreateOrderRequest {
  readonly type: typeof at.CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccess {
  readonly type: typeof at.CREATE_ORDER_SUCCESS;
  readonly order: IOrder;
}

export interface ICreateOrderFailed {
  readonly type: typeof at.CREATE_ORDER_FAILED;
}

export interface IRemoveOrder {
  readonly type: typeof at.REMOVE_ORDER;
}

export type TOrderActions =
  | ICreateOrderRequest
  | ICreateOrderSuccess
  | ICreateOrderFailed
  | IRemoveOrder;

export const createOrderRequest = (): ICreateOrderRequest => ({
  type: at.CREATE_ORDER_REQUEST,
});

export const createOrderSuccess = (order: IOrder): ICreateOrderSuccess => ({
  type: at.CREATE_ORDER_SUCCESS,
  order,
});

export const createOrderFailed = (): ICreateOrderFailed => ({
  type: at.CREATE_ORDER_FAILED,
});

export const removeOrder = (): IRemoveOrder => ({
  type: at.REMOVE_ORDER,
});

export const createOrder: AppThunk = (
  ingredients: Array<IIngredient["_id"]>,
  token: string
) => {
  return async function (dispatch: AppDispatch) {
    dispatch(createOrderRequest());
    try {
      const order: IOrder = await createOrderApi(ingredients, token);
      dispatch(createOrderSuccess(order));
    } catch (err: any) {
      dispatch(createOrderFailed());
      console.error("Error in createOrder thunk ", err.status);
    }
  };
};
