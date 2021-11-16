import React, { useState, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import css from "./burger-ingredients.module.css";

const IngredientGridItem = ({ ingredient }) => {
  return <div>{ingredient.name}</div>;
};

const BurgerIngredients = ({ ingredients }) => {
  console.log(ingredients);
  const [currentType, setCurrentType] = useState("");

  const currentIngredients = useMemo(
    () =>
      currentType
        ? ingredients.filter((ingredient) => ingredient.type === currentType)
        : [...ingredients],
    [currentType, ingredients]
  );

  console.log(currentIngredients);

  return (
    <>
      <h2>Соберите бургер</h2>
      <div className={css.tabs}>
        <Tab
          value="bun"
          active={currentType === "bun"}
          onClick={setCurrentType}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentType === "sauce"}
          onClick={setCurrentType}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentType === "main"}
          onClick={setCurrentType}
        >
          Начинки
        </Tab>
      </div>
      <h3>
        {currentType === "bun"
          ? "Булки"
          : currentType === "sauce"
          ? "Соусы"
          : currentType === "main"
          ? "Начинки"
          : ""}
      </h3>
      <ul style={{ maxHeight: "100vh" }}>
        {currentIngredients.map((i) => (
          <IngredientGridItem ingredient={i} />
        ))}
      </ul>
    </>
  );
};

export default BurgerIngredients;
