import { ILoginFailed, ISignupFailed } from "../actions/user";
import { AppDispatch } from "../types";

export const handleThunkError = async (
  err: any,
  dispatch: AppDispatch,
  actionFailed: (errMsg: string) => ISignupFailed | ILoginFailed
) => {
  if (err.status === 500) {
    dispatch(actionFailed("Server error"));
    return Promise.reject({ message: "Server error" });
  } else if (err.json) {
    const error = await err.json().then((parsedError: any) => {
      dispatch(actionFailed(parsedError.message));
      return parsedError;
    });
    return Promise.reject(error);
  } else {
    return Promise.reject({ message: "Что-то пошло не так :(" });
  }
};
