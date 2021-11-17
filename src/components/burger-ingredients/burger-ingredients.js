import React, { useState } from "react";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import css from "./burger-ingredients.module.css";

const translate = { bun: "Булки", sauce: "Соусы", main: "Начинки" };

const IngredientCard = ({ ingredient }) => {
  return (
    <li className={css.card}>
      <img src={ingredient.image} alt={ingredient.name} />
      <span>
        {ingredient.price}
        <CurrencyIcon />
      </span>
      <span className={css.ingredientName}>{ingredient.name}</span>
    </li>
  );
};

const IngredientsBlock = ({ ingredientTitle, ingredients }) => {
  return (
    <div>
      <h3>{ingredientTitle}</h3>
      <ul className={css.cards}>
        {ingredients.map((i) => (
          <IngredientCard key={i.id} ingredient={i} />
        ))}
      </ul>
    </div>
  );
};

const BurgerIngredients = ({ ingredients }) => {
  const [currentType, setCurrentType] = useState("");

  return (
    <div className={css.root}>
      <h2 className={css.title}>Соберите бургер</h2>
      <div className={css.tabs}>
        {Object.keys(translate).map((ingredientType) => (
          <Tab
            value={ingredientType}
            active={currentType === ingredientType}
            onClick={setCurrentType}
          >
            {translate[ingredientType]}
          </Tab>
        ))}
      </div>
      <div className={css.ingredientsRoot}>
        {Object.keys(translate).map((ingredientType) => (
          <IngredientsBlock
            key={ingredientType}
            ingredientTitle={translate[ingredientType]}
            ingredients={ingredients.filter((i) => i.type === ingredientType)}
          />
        ))}
      </div>
    </div>
  );
};

export default BurgerIngredients;
