import React from "react";
import Form from "../../components/form/form";

const ResetPassword = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Form
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

export default ResetPassword;
