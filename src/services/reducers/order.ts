import * as at from "../action-types";
import { TOrderActions } from "../actions/orders";
import { IOrder } from "../types/data";

type TOrdersState = {
  currentOrder: IOrder;
  orderRequest: boolean;
  orderFailed: boolean;
};

const ordersInitialState: TOrdersState = {
  currentOrder: {},
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (
  state = ordersInitialState,
  action: TOrderActions
) => {
  switch (action.type) {
    case at.CREATE_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case at.CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        currentOrder: action.order,
      };
    }
    case at.CREATE_ORDER_FAILED: {
      return { ...state, orderRequest: false, orderFailed: true };
    }
    case at.REMOVE_ORDER: {
      return ordersInitialState;
    }
    default:
      return state;
  }
};
