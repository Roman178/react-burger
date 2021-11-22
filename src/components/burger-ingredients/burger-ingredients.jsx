import React, { useState, forwardRef, useRef } from "react";
import PropTypes from "prop-types";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import css from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useModal } from "../../hooks/useModal";
import cn from "classnames";
import {
  BUN,
  SAUCE,
  MAIN_INGREDIENT,
  translate,
} from "../../constants/constants";

const IngredientCard = ({ ingredient }) => {
  const { isOpenModal, closeModal, openModal } = useModal();

  return (
    <>
      <Modal closeModal={closeModal} isOpenModalProp={isOpenModal}>
        <IngredientDetails {...ingredient} />
      </Modal>

      <li className={css.card} onClick={() => openModal()}>
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={css.priceBox}>
          <span className="text text_type_digits-default mr-2">
            {ingredient.price}
          </span>
          <CurrencyIcon />
        </div>
        <span className={cn(css.ingredientName, "text text_type_main-default")}>
          {ingredient.name}
        </span>
      </li>
    </>
  );
};

const IngredientsBlock = forwardRef(
  ({ ingredientTitle, filteredIngredients }, ref) => {
    return (
      <div className="mb-10">
        <h3 className="text text_type_main-medium mb-6" ref={ref}>
          {ingredientTitle}
        </h3>
        <ul className={css.cards}>
          {filteredIngredients.map((i) => (
            <IngredientCard key={i._id} ingredient={i} />
          ))}
        </ul>
      </div>
    );
  }
);

const BurgerIngredients = ({ ingredients }) => {
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
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <div className={css.tabs}>
        {Object.keys(translate).map((ingredientType) => (
          <Tab
            key={ingredientType}
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
            ref={refs[`${ingredientType}Ref`]}
            key={ingredientType}
            ingredientTitle={translate[ingredientType]}
            filteredIngredients={ingredients.filter(
              (i) => i.type === ingredientType
            )}
          />
        ))}
      </div>
    </div>
  );
};

IngredientCard.propTypes = {
  ingredient: PropTypes.exact({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  }),
};

IngredientsBlock.propTypes = {
  filteredIngredients: PropTypes.arrayOf(
    PropTypes.exact({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    })
  ),
  ingredientTitle: PropTypes.string,
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.exact({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    })
  ),
};

export default BurgerIngredients;
