import * as at from "../action-types";
import { TWsActions } from "../actions/ws";

type TWsState = {
  wsConnected: boolean;
  orders: any;
};

const wsInitialState: TWsState = {
  wsConnected: false,
  orders: {},
};

export const wsReducer = (state = wsInitialState, action: TWsActions) => {
  switch (action.type) {
    case at.WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
      };
    }

    case at.WS_CONNECTION_ERROR: {
      return {
        wsConnected: false,
        orders: {},
      };
    }

    case at.WS_CONNECTION_CLOSED: {
      return {
        wsConnected: false,
        orders: {},
      };
    }

    case at.WS_GET_MESSAGE: {
      return {
        ...state,
        orders: { ...action.payload, orders: action.payload.orders?.reverse() },
      };
    }

    default:
      return state;
  }
};
