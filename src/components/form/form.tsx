import React, { ChangeEvent, FC, useMemo, useState } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import css from "./form.module.css";
import cn from "classnames";

interface IFormProps {
  buttonText: string;
  inputs: Array<{
    name: string;
    placeholder: string;
    type: "text" | "email" | "password" | undefined;
  }>;
  title: string;
  onSubmit: (values: any) => void;
  suggestedActions: Array<{ text: string; link: string; linkText: string }>;
}

const Form: FC<IFormProps> = ({
  buttonText,
  inputs,
  title,
  onSubmit,
  suggestedActions,
}) => {
  const initialInputsValues = useMemo(() => {
    const inputsValues: any = {};
    inputs.forEach((i) => {
      inputsValues[i.name] = "";
    });
    return inputsValues;
  }, [inputs]);

  const [inputsValues, setInputsValues] = useState(initialInputsValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputsValues({
      ...inputsValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={css.root}>
      <form className={cn("mb-20", css.form)}>
        <h2 className="text text_type_main-medium mb-6">{title}</h2>
        {inputs.map((input) => (
          <div key={input.name} className="mb-6">
            <Input
              name={input.name}
              type={input.type}
              onChange={handleChange}
              value={inputsValues[input.name]}
              placeholder={input.placeholder}
            />
          </div>
        ))}
        <Button
          onClick={(e) => {
            e.preventDefault();
            onSubmit(inputsValues);
          }}
        >
          {buttonText}
        </Button>
      </form>

      {suggestedActions.map((action) => (
        <div className="mb-4" key={action.link}>
          <span className="text text_type_main-default text_color_inactive">
            {action.text}&nbsp;
          </span>
          <Link
            className={cn("text text_type_main-default", css.link)}
            to={action.link}
          >
            {action.linkText}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Form;
