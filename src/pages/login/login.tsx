import React, { FC } from "react";
import Form from "../../components/form/form";
import { loginThunk } from "../../services/actions/user";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { AppThunk } from "../../services/types";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/constants";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { IUserLoginResponse } from "../../services/types/data";
import Spinner from "../../components/spinner/spinner";

interface ILoginProps {
  login?: AppThunk;
}

const Login: FC<ILoginProps> = ({ login, ...other }) => {
  const [, setCookie] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN]);
  const history = useHistory();
  const location = useLocation<any>();
  const userIsLoggedIn = useSelector((store) => store.user.isLoggedIn);
  const userLoginRequest = useSelector(
    (store) => store.user.userLogin.userLoginRequest
  );

  const handleSubmit = async (values: any) => {
    try {
      const response: any = login!(values);
      const user: IUserLoginResponse = await response;
      setCookie(ACCESS_TOKEN, user.accessToken, { path: "/" });
      setCookie(REFRESH_TOKEN, user.refreshToken, { path: "/" });
      history.replace({ pathname: "/" });
      toast.success("Вы успешно вошли");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return userLoginRequest ? (
    <Spinner />
  ) : (
    <>
      {userIsLoggedIn ? (
        <Redirect
          to={{
            pathname: location.state?.from.pathname
              ? location.state.from.pathname
              : "/profile",
          }}
        />
      ) : (
        <Form
          inputs={[
            { name: "email", placeholder: "email", type: "email" },
            { name: "password", placeholder: "Пароль", type: "password" },
          ]}
          buttonText="Войти"
          title="Вход"
          onSubmit={handleSubmit}
          suggestedActions={[
            {
              text: "Вы — новый пользователь?",
              link: "register",
              linkText: "Зарегистрироваться",
            },
            {
              text: "Забыли пароль?",
              link: "forgot-password",
              linkText: "Восстановить пароль",
            },
          ]}
        />
      )}
    </>
  );
};

const mapDispatchToProps = {
  login: loginThunk,
};

export default connect<AppThunk>(undefined, mapDispatchToProps)(Login);
