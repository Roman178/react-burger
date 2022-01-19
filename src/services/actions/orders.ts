import * as c from "../constants";
import { createOrderApi } from "../../api/api";
import { AppDispatch, AppThunk } from "../types";
import { IIngredient, IOrder } from "../types/data";

export interface ICreateOrderRequest {
  readonly type: typeof c.CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccess {
  readonly type: typeof c.CREATE_ORDER_SUCCESS;
  readonly order: IOrder;
}

export interface ICreateOrderFailed {
  readonly type: typeof c.CREATE_ORDER_FAILED;
}

export interface IRemoveOrder {
  readonly type: typeof c.REMOVE_ORDER;
}

export type TOrderActions =
  | ICreateOrderRequest
  | ICreateOrderSuccess
  | ICreateOrderFailed
  | IRemoveOrder;

export const createOrderRequest = (): ICreateOrderRequest => ({
  type: c.CREATE_ORDER_REQUEST,
});

export const createOrderSuccess = (order: IOrder): ICreateOrderSuccess => ({
  type: c.CREATE_ORDER_SUCCESS,
  order,
});

export const createOrderFailed = (): ICreateOrderFailed => ({
  type: c.CREATE_ORDER_FAILED,
});

export const removeOrder = (): IRemoveOrder => ({
  type: c.REMOVE_ORDER,
});

export const createOrder: AppThunk = (
  ingredients: Array<IIngredient["_id"]>
) => {
  return async function (dispatch: AppDispatch) {
    dispatch(createOrderRequest());
    try {
      const order: IOrder = await createOrderApi(ingredients);
      dispatch(createOrderSuccess(order));
    } catch (err: any) {
      dispatch(createOrderFailed());
      console.error("Error in createOrder thunk ", err.status);
    }
  };
};
