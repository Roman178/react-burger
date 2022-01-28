import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../api/api";
import Form from "../../components/form/form";
import Spinner from "../../components/spinner/spinner";

const ResetPassword = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  console.log(history);

  const handleSubmit = async (values: {
    newPassword: string;
    codeFromEmail: string;
  }) => {
    try {
      setLoading(true);
      await resetPassword({
        password: values.newPassword,
        token: values.codeFromEmail,
      });
      setLoading(false);
      toast.success("Пароль успешно изменен");
      history.push("/login");
    } catch (error: any) {
      const parsedError = await error.json();
      toast.error(parsedError.message);
    }
  };

  return (
    <>
      {history.action === "POP" ? (
        <Redirect to={{ pathname: "/forgot-password" }} />
      ) : (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <Form
              title="Восстановление пароля"
              inputs={[
                {
                  name: "newPassword",
                  placeholder: "Введите новый пароль",
                  type: "password",
                },
                {
                  name: "codeFromEmail",
                  placeholder: "Введите код из письма",
                  type: "text",
                },
              ]}
              buttonText="Сохранить"
              onSubmit={handleSubmit}
              suggestedActions={[
                {
                  text: "Вспомнили пароль?",
                  link: "login",
                  linkText: "Войти",
                },
              ]}
            />
          )}
        </>
      )}
    </>
  );
};

export default ResetPassword;
