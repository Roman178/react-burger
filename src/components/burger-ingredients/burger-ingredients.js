import React, { useState, forwardRef, useRef } from "react";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import css from "./burger-ingredients.module.css";

const BUN = "bun";
const SAUCE = "sauce";
const MAIN_INGREDIENT = "main";

const translate = {
  [BUN]: "Булки",
  [SAUCE]: "Соусы",
  [MAIN_INGREDIENT]: "Начинки",
};

const IngredientCard = ({ ingredient, addIngredient }) => {
  return (
    <li className={css.card} onClick={() => addIngredient(ingredient)}>
      <img src={ingredient.image} alt={ingredient.name} />
      <span>
        {ingredient.price}
        <CurrencyIcon />
      </span>
      <span className={css.ingredientName}>{ingredient.name}</span>
    </li>
  );
};

const IngredientsBlock = forwardRef(
  ({ ingredientTitle, ingredients, addIngredient }, ref) => {
    return (
      <div>
        <h3 ref={ref}>{ingredientTitle}</h3>
        <ul className={css.cards}>
          {ingredients.map((i) => (
            <IngredientCard
              addIngredient={addIngredient}
              key={i._id}
              ingredient={i}
            />
          ))}
        </ul>
      </div>
    );
  }
);

const BurgerIngredients = ({ ingredients, addIngredient }) => {
  const [currentType, setCurrentType] = useState("");
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const refs = {
    [`${BUN}Ref`]: bunRef,
    [`${SAUCE}Ref`]: sauceRef,
    [`${MAIN_INGREDIENT}Ref`]: mainRef,
  };

  const handleTabClick = (type) => {
    setCurrentType(type);
    refs[`${type}Ref`].current.scrollIntoView();
  };

  return (
    <div className={css.root}>
      <h2 className={css.title}>Соберите бургер</h2>
      <div className={css.tabs}>
        {Object.keys(translate).map((ingredientType) => (
          <Tab
            value={ingredientType}
            active={currentType === ingredientType}
            onClick={handleTabClick}
          >
            {translate[ingredientType]}
          </Tab>
        ))}
      </div>
      <div className={css.ingredientsRoot}>
        {Object.keys(translate).map((ingredientType) => (
          <IngredientsBlock
            addIngredient={addIngredient}
            ref={refs[`${ingredientType}Ref`]}
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
