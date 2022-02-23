import {
  loginApi,
  signupApi,
  logoutApi,
  authAccessTokenApi,
  authRefreshTokenApi,
  updateUserApi,
} from "../../api/api";
import * as c from "../constants";
import { AppDispatch, AppThunk } from "../types";
import {
  IUserSignupRequest,
  IUserLoginResponse,
  IUserLoginRequest,
  IUserTokenResponse,
} from "../types/data";
import { handleThunkError } from "../utils";

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

export interface ILogoutSuccess {
  readonly type: typeof c.LOGOUT_USER_SUCCESS;
}

export interface IUpdateUserRequest {
  readonly type: typeof c.UPDATE_USER_REQUEST;
}

export interface IUpdateUserFailed {
  readonly type: typeof c.UPDATE_USER_FAILED;
  readonly errorMessage: string;
}

export interface IUpdateUserSuccess {
  readonly type: typeof c.UPDATE_USER_SUCCESS;
  readonly user: IUserLoginResponse;
}

export type TUserActions =
  | ISignupRequest
  | ISignupFailed
  | ILoginRequest
  | ILoginSuccess
  | ILoginFailed
  | ILogoutSuccess
  | IUpdateUserRequest
  | IUpdateUserFailed
  | IUpdateUserSuccess;

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

export const logoutSuccess = (): ILogoutSuccess => ({
  type: c.LOGOUT_USER_SUCCESS,
});

export const updateUserRequest = (): IUpdateUserRequest => ({
  type: c.UPDATE_USER_REQUEST,
});

export const updateUserFailed = (errorMessage: string): IUpdateUserFailed => ({
  type: c.UPDATE_USER_FAILED,
  errorMessage,
});

export const updateUserSuccess = (
  user: IUserLoginResponse
): IUpdateUserSuccess => ({
  type: c.UPDATE_USER_SUCCESS,
  user,
});

export const signupThunk: AppThunk<Promise<any>> = (
  user: IUserSignupRequest
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(signupRequest());

    return signupApi(user)
      .then((userData: IUserLoginResponse) => {
        dispatch(
          loginSuccess({
            success: userData.success,
            user: { email: userData.user.email, name: userData.user.name },
          })
        );
        return userData;
      })
      .catch((err) => handleThunkError(err, dispatch, signupFailed));
  };
};

export const loginThunk: AppThunk<Promise<any>> = (user: IUserLoginRequest) => {
  return async (dispatch: AppDispatch) => {
    dispatch(loginRequest());

    return loginApi(user)
      .then((userData: IUserLoginResponse) => {
        dispatch(
          loginSuccess({
            success: userData.success,
            user: { email: userData.user!.email, name: userData.user!.name },
          })
        );
        return userData;
      })
      .catch((err) => handleThunkError(err, dispatch, loginFailed));
  };
};

export const logoutThunk: AppThunk<Promise<any>> = (refreshToken: string) => {
  return async (dispatch: AppDispatch) => {
    return logoutApi(refreshToken)
      .then(() => {
        dispatch(logoutSuccess());
      })
      .catch(() => dispatch(logoutSuccess()));
  };
};

export const authAccessTokenThunk: AppThunk<Promise<any>> = (
  accessToken: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(loginRequest());

    return authAccessTokenApi(accessToken)
      .then((userData: IUserTokenResponse) => {
        dispatch(loginSuccess(userData));
        return userData;
      })
      .catch((err) => handleThunkError(err, dispatch, loginFailed));
  };
};

export const authRefreshTokenThunk: AppThunk<Promise<any>> = (
  refreshToken: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(loginRequest());

    return authRefreshTokenApi(refreshToken).then((tokenData) =>
      authAccessTokenApi(tokenData.accessToken)
        .then((userData: IUserTokenResponse) => {
          dispatch(loginSuccess(userData));
          return tokenData;
        })
        .catch((err) => handleThunkError(err, dispatch, loginFailed))
    );
  };
};

export const updateUserThunk: AppThunk<Promise<any>> = (
  newUserData,
  accessToken
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(updateUserRequest());

    return updateUserApi(newUserData, accessToken)
      .then((user: any) => {
        dispatch(updateUserSuccess(user));
        return user;
      })
      .catch((err) => handleThunkError(err, dispatch, loginFailed));
  };
};
