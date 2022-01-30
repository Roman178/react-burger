import * as c from "../constants";
import { TUserActions } from "../actions/user";
import { IUserSignupRequest, IUserLoginResponse } from "../types/data";

type TUserState = {
  currentUser: IUserLoginResponse;
  userSignup: {
    userSignupRequest: boolean;
    userSignupFailed: { status: boolean; message: string };
  };
  userLogin: {
    userLoginRequest: boolean;
    userLoginFailed: { status: boolean; message: string };
  };
  userUpdate: {
    userUpdateRequest: boolean;
    userUpdateFailed: { status: boolean; message: string };
  };
  isLoggedIn: boolean;
};

const userInitialState: TUserState = {
  currentUser: {
    success: false,
    user: {
      email: "",
      name: "",
    },
  },
  userSignup: {
    userSignupRequest: false,
    userSignupFailed: { status: false, message: "" },
  },
  userLogin: {
    userLoginRequest: false,
    userLoginFailed: { status: false, message: "" },
  },
  userUpdate: {
    userUpdateRequest: false,
    userUpdateFailed: { status: false, message: "" },
  },
  isLoggedIn: false,
};

export const userReducer = (state = userInitialState, action: TUserActions) => {
  switch (action.type) {
    case c.SIGNUP_USER_REQUEST: {
      return {
        ...state,
        userSignup: {
          userSignupRequest: true,
          userSignupFailed: { status: false, message: "" },
        },
      };
    }
    case c.SIGNUP_USER_FAILED: {
      return {
        ...state,
        userSignup: {
          userSignupRequest: false,
          userSignupFailed: { status: true, message: action.errorMessage },
        },
        isLoggedIn: false,
      };
    }
    case c.LOGIN_USER_REQUEST: {
      return {
        ...state,
        userLogin: {
          userLoginRequest: true,
          userLoginFailed: { status: false, message: "" },
        },
      };
    }
    case c.LOGIN_USER_FAILED: {
      return {
        ...state,
        userLogin: {
          userLoginRequest: false,
          userLoginFailed: { status: true, message: action.errorMessage },
        },
        isLoggedIn: false,
      };
    }
    case c.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        currentUser: action.user,
        userSignup: {
          userSignupRequest: false,
          userSignupFailed: { status: false, message: "" },
        },
        userLogin: {
          userLoginRequest: false,
          userLoginFailed: { status: false, message: "" },
        },
        isLoggedIn: true,
      };
    }
    case c.LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        currentUser: {
          success: false,
          user: {
            email: "",
            name: "",
          },
        },
        isLoggedIn: false,
      };
    }
    case c.UPDATE_USER_REQUEST: {
      return {
        ...state,
        userUpdate: {
          userUpdateRequest: true,
          userUpdateFailed: { status: false, message: "" },
        },
      };
    }
    case c.UPDATE_USER_FAILED: {
      return {
        ...state,
        userUpdate: {
          userUpdateRequest: false,
          userUpdateFailed: { status: true, message: action.errorMessage },
        },
      };
    }
    case c.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        currentUser: action.user,
        userUpdate: {
          userUpdateRequest: false,
          userUpdateFailed: { status: false, message: "" },
        },
      };
    }
    default:
      return state;
  }
};
