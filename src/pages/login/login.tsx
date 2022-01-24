import React, { FC } from "react";
import Form from "../../components/form/form";
import { loginThunk } from "../../services/actions/user";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { AppThunk } from "../../services/types";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/constants";

interface ILoginProps {
  login?: AppThunk;
}

const Login: FC<ILoginProps> = ({ login }) => {
  const [, setCookie] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN]);

  const handleSubmit = async (values: any) => {
    try {
      const user: any = await login!(values);
      setCookie(ACCESS_TOKEN, user.accessToken, { path: "/" });
      setCookie(REFRESH_TOKEN, user.refreshToken, { path: "/" });
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
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
  );
};

const mapDispatchToProps = {
  login: loginThunk,
};

export default connect<AppThunk>(undefined, mapDispatchToProps)(Login);
