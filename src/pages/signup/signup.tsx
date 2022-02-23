import React, { FC } from "react";
import Form from "../../components/form/form";
import { signupThunk } from "../../services/actions/user";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { AppThunk } from "../../services/types";
import { IUserLoginResponse } from "../../services/types/data";
import { useCookies } from "react-cookie";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/constants";

interface ISignupProps {
  signup?: AppThunk;
}

const Signup: FC<ISignupProps> = ({ signup }) => {
  const [, setCookie] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN]);
  const history = useHistory();
  const userIsLoggedIn = useSelector((store) => store.user.isLoggedIn);
  const handleSubmit = async (values: any) => {
    try {
      const response: any = signup!(values);
      const user: IUserLoginResponse = await response;
      setCookie(ACCESS_TOKEN, user.accessToken, { path: "/" });
      setCookie(REFRESH_TOKEN, user.refreshToken, { path: "/" });
      history.replace({ pathname: "/profile" });
      toast.success("Вы успешно вошли");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return userIsLoggedIn ? (
    <Redirect to="/profile" />
  ) : (
    <Form
      title="Регистрация"
      inputs={[
        { name: "name", placeholder: "Имя", type: "text" },
        { name: "email", placeholder: "E-mail", type: "email" },
        { name: "password", placeholder: "Пароль", type: "password" },
      ]}
      onSubmit={handleSubmit}
      buttonText="Зарегистрироваться"
      suggestedActions={[
        {
          text: "Уже зарегистрированы?",
          link: "login",
          linkText: "Войти",
        },
      ]}
    />
  );
};

const mapDispatchToProps = {
  signup: signupThunk,
};

export default connect<AppThunk>(undefined, mapDispatchToProps)(Signup);
