import React, { FC } from "react";
import Form from "../../components/form/form";
import { signupThunk } from "../../services/actions/user";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { AppThunk } from "../../services/types";

interface ISignupProps {
  signup?: AppThunk;
}

const Signup: FC<ISignupProps> = ({ signup }) => {
  const handleSubmit = async (values: any) => {
    try {
      const user = await signup!(values);
      console.log(user);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
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
