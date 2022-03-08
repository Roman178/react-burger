import { Middleware } from "redux";
import { WS_URL } from "../../constants/constants";
import { RootState } from "../types/index";

export const socketMiddleware: any = (
  wsActions: any
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = payload.token
          ? new WebSocket(`${WS_URL}?token=${payload.token}`)
          : new WebSocket(`${WS_URL}/all`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };
        socket.onerror = (event) => dispatch({ type: onError, payload: event });
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };
        socket.onclose = (event) => dispatch({ type: onClose, payload: event });
      }

      next(action);
    };
  };
};
