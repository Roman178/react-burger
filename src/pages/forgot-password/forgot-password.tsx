import React, { FC } from "react";
import Form from "../../components/form/form";

const ForgotPassword: FC = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      inputs={[{ name: "email", placeholder: "Укажите E-mail", type: "email" }]}
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
  );
};

export default ForgotPassword;
