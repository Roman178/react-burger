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
  } else {
    const error = await err.json().then((parsedError: any) => {
      dispatch(actionFailed(parsedError.message));
      return parsedError;
    });
    return Promise.reject(error);
  }
};
