import * as c from "../constants";
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
    case c.CREATE_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case c.CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        currentOrder: action.order,
      };
    }
    case c.CREATE_ORDER_FAILED: {
      return { ...state, orderRequest: false, orderFailed: true };
    }
    case c.REMOVE_ORDER: {
      return ordersInitialState;
    }
    default:
      return state;
  }
};
