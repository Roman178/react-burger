import React, { FC, useCallback, useEffect } from "react";
import Layout from "../layout/layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import Signup from "../../pages/signup/signup";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "../../pages/profile/profile";
import PrivateRoute from "../private-route/private-route";
import { useCookies } from "react-cookie";
import {
  ACCESS_TOKEN,
  JWT_EXPIRED,
  REFRESH_TOKEN,
  SHOULD_BE_AUTH,
} from "../../constants/constants";
import { useDispatch, useSelector } from "../../services/hooks";
import {
  authAccessTokenThunk,
  authRefreshTokenThunk,
  loginFailed,
} from "../../services/actions/user";
import { connect } from "react-redux";
import { AppThunk } from "../../services/types";
import Spinner from "../spinner/spinner";
import { getIngredientsThunk } from "../../services/actions/ingredients";
import Feed from "../feed/feed";

interface IAppProps {
  authAccessToken?: AppThunk;
  authRefreshToken?: AppThunk;
}

const App: FC<IAppProps> = ({ authAccessToken, authRefreshToken }) => {
  const [cookies, setCookie] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN]);
  const dispatch = useDispatch();
  const userSignupRequest = useSelector(
    (store) => store.user.userSignup.userSignupRequest
  );
  const userLoginRequest = useSelector(
    (store) => store.user.userLogin.userLoginRequest
  );
  const isApiRequest = userSignupRequest || userLoginRequest;

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  const authenticate = useCallback(async () => {
    try {
      await authAccessToken!(cookies[ACCESS_TOKEN]);
    } catch (errorResponse: any) {
      if (errorResponse.message === JWT_EXPIRED) {
        try {
          const tokenData: any = await authRefreshToken!(
            cookies[REFRESH_TOKEN]
          );
          setCookie(ACCESS_TOKEN, tokenData.accessToken);
          setCookie(REFRESH_TOKEN, tokenData.refreshToken);
        } catch (error: any) {
          dispatch(loginFailed(error.message));
        }
      } else if (errorResponse.message === SHOULD_BE_AUTH) {
        dispatch(loginFailed(""));
        return;
      } else {
        dispatch(loginFailed(errorResponse.message));
        toast.error(errorResponse.message);
      }
    }
  }, []);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return (
    <Router>
      <Layout>
        {isApiRequest ? (
          <Spinner />
        ) : (
          <Switch>
            <Route path={["/", "/ingredients/:id"]} exact>
              <Home />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <Signup />
            </Route>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <Route path="/forgot-password" exact>
              <ForgotPassword />
            </Route>
            <Route path="/reset-password" exact>
              <ResetPassword />
            </Route>
            <Route path="/feed" exact>
              <Feed />
            </Route>
          </Switch>
        )}
        <ToastContainer />
      </Layout>
    </Router>
  );
};

const mapDispatchToProps = {
  authAccessToken: authAccessTokenThunk,
  authRefreshToken: authRefreshTokenThunk,
};

export default connect<AppThunk>(undefined, mapDispatchToProps)(App);
