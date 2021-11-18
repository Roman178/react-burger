import React from "react";
import css from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = ({ selectedIngredients }) => {
  console.log(selectedIngredients);

  const selectedBun = selectedIngredients.find(
    (ingredient) => ingredient.type === "bun"
  );

  console.log(selectedBun);
  return (
    <div className={css.root}>
      <ConstructorElement
        type="top"
        isLocked={true}
        // text={selectedBun.name}
        price={200}
        thumbnail={selectedBun.image}
      />
      <ConstructorElement
        type="bottom"
        isLocked={true}
        // text={selectedBun.name}
        price={200}
        thumbnail={selectedBun.image}
      />
    </div>
  );
};

export default BurgerConstructor;
