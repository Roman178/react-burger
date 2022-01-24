import { loginApi, signupApi } from "../../api/api";
import * as c from "../constants";
import { AppDispatch, AppThunk } from "../types";
import {
  IUserSignupRequest,
  IUserLoginResponse,
  IUserLoginRequest,
} from "../types/data";

export interface ISignupRequest {
  readonly type: typeof c.SIGNUP_USER_REQUEST;
}

export interface ISignupFailed {
  readonly type: typeof c.SIGNUP_USER_FAILED;
  readonly errorMessage: string;
}

export interface ILoginRequest {
  readonly type: typeof c.LOGIN_USER_REQUEST;
}

export interface ILoginFailed {
  readonly type: typeof c.LOGIN_USER_FAILED;
  readonly errorMessage: string;
}

export interface ILoginSuccess {
  readonly type: typeof c.LOGIN_USER_SUCCESS;
  readonly user: IUserLoginResponse;
}

export type TUserActions =
  | ISignupRequest
  | ISignupFailed
  | ILoginRequest
  | ILoginSuccess
  | ILoginFailed;

export const signupRequest = (): ISignupRequest => ({
  type: c.SIGNUP_USER_REQUEST,
});

export const signupFailed = (errorMessage: string): ISignupFailed => ({
  type: c.SIGNUP_USER_FAILED,
  errorMessage,
});

export const loginRequest = (): ILoginRequest => ({
  type: c.LOGIN_USER_REQUEST,
});

export const loginFailed = (errorMessage: string): ILoginFailed => ({
  type: c.LOGIN_USER_FAILED,
  errorMessage,
});

export const loginSuccess = (user: IUserLoginResponse): ILoginSuccess => ({
  type: c.LOGIN_USER_SUCCESS,
  user,
});

export const signupThunk: AppThunk = (user: IUserSignupRequest) => {
  return async (dispatch: AppDispatch) => {
    dispatch(signupRequest());
    return signupApi(user)
      .then((userData) => {
        dispatch(loginSuccess(userData));
        return userData;
      })
      .catch(async (err) => {
        if (err.status === 500) {
          dispatch(signupFailed("Server error"));
          return Promise.reject({ message: "Server error" });
        } else {
          const error = await err.json().then((parsedError: any) => {
            dispatch(signupFailed(parsedError.message));
            return parsedError;
          });
          return Promise.reject(error);
        }
      });
  };
};

export const loginThunk: AppThunk = (user: IUserLoginRequest) => {
  return async (dispatch: AppDispatch) => {
    dispatch(loginRequest());
    return loginApi(user)
      .then((userData) => {
        dispatch(loginSuccess(userData));
        return userData;
      })
      .catch(async (err) => {
        if (err.status === 500) {
          dispatch(loginFailed("Server error"));
          return Promise.reject({ message: "Server error" });
        } else {
          const error = await err.json().then((parsedError: any) => {
            dispatch(loginFailed(parsedError.message));
            return parsedError;
          });
          return Promise.reject(error);
        }
      });
  };
};
