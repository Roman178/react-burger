import * as types from "../actions/actionTypes";

const initialState = {
  currentOrder: {},
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case types.CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        currentOrder: action.order,
      };
    }
    case types.CREATE_ORDER_FAILED: {
      return { ...state, orderRequest: false, orderFailed: true };
    }
    default:
      return state;
  }
};
