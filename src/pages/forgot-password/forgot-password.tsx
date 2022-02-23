import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { forgotPassword } from "../../api/api";
import Form from "../../components/form/form";
import Spinner from "../../components/spinner/spinner";

const ForgotPassword: FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { email: string }) => {
    setLoading(true);
    await forgotPassword(values.email);
    setLoading(false);
    history.push({
      pathname: "/reset-password",
      state: {
        from: history.location,
      },
    });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Form
          inputs={[
            { name: "email", placeholder: "Укажите E-mail", type: "email" },
          ]}
          buttonText="Восстановить"
          title="Восстановление пароля"
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
  );
};

export default ForgotPassword;
