import * as at from "../action-types";

interface IWsConnectionStart {
  readonly type: typeof at.WS_CONNECTION_START;
  readonly payload: { token: string };
}

interface IWsConnectionSuccess {
  readonly type: typeof at.WS_CONNECTION_SUCCESS;
}

interface IWsConnectionError {
  readonly type: typeof at.WS_CONNECTION_ERROR;
}

interface IWsConnectionClosed {
  readonly type: typeof at.WS_CONNECTION_CLOSED;
}

interface IWsGetMessage {
  readonly type: typeof at.WS_GET_MESSAGE;
  readonly payload: any;
}

export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage;

export const wsConnectionStart = (token = ""): IWsConnectionStart => {
  return {
    type: at.WS_CONNECTION_START,
    payload: { token },
  };
};

export const wsConnectionSuccess = (): IWsConnectionSuccess => {
  return { type: at.WS_CONNECTION_SUCCESS };
};

export const wsConnectionError = (): IWsConnectionError => {
  return { type: at.WS_CONNECTION_ERROR };
};

export const wsConnectionClosed = (): IWsConnectionClosed => {
  return { type: at.WS_CONNECTION_CLOSED };
};

export const wsGetMessage = (data: any): IWsGetMessage => {
  return { type: at.WS_GET_MESSAGE, payload: data };
};
