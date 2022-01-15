import React, {
  useState,
  forwardRef,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { ingredientType } from "../../types/index";
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
import { getIngredients } from "../../services/actions";
import * as types from "../../services/actions/actionTypes";
import { useDrag } from "react-dnd";

const IngredientCard = ({ ingredient }) => {
  const { isOpenModal, closeModal, openModal } = useModal();
  const ingredientQty = useSelector(
    (store) =>
      store.burgerIngredients.quantity.find((i) => i.id === ingredient._id)?.qty
  );
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  const setIngredient = () => {
    dispatch({
      type: types.SET_CURRENT_INGREDIENT,
      currentIngredient: ingredient,
    });
    openModal();
  };

  const closeModalWithDispatch = () => {
    dispatch({ type: types.REMOVE_CURRENT_INGREDIENT });
    closeModal();
  };

  return (
    <>
      {isOpenModal && (
        <Modal closeModal={closeModalWithDispatch}>
          <IngredientDetails {...ingredient} />
        </Modal>
      )}

      <li ref={dragRef} className={css.card} onClick={() => setIngredient()}>
        {ingredientQty && (
          <span
            className={cn(css.quantity, "text text_type_digits-default mr-2")}
          >
            {ingredientQty}
          </span>
        )}
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
      <div className="pb-10">
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

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.items);

  useEffect(() => {
    if (ingredients.length === 0) dispatch(getIngredients());
  }, [dispatch, ingredients]);

  const [currentType, setCurrentType] = useState(BUN);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const refs = {
    [`${BUN}Ref`]: bunRef,
    [`${SAUCE}Ref`]: sauceRef,
    [`${MAIN_INGREDIENT}Ref`]: mainRef,
  };

  const handleScroll = useCallback(
    (e) => {
      const mainBlockTopCoordinate = e.target.getBoundingClientRect().top;

      const getCoordinates = (ref) => {
        return {
          top: ref.current.parentNode.getBoundingClientRect().top,
          bottom: ref.current.parentNode.getBoundingClientRect().bottom,
        };
      };

      const isCurrentScrollingBlock = (coordinates, ingredientType) => {
        return (
          coordinates.top <= mainBlockTopCoordinate &&
          coordinates.bottom > mainBlockTopCoordinate &&
          currentType !== ingredientType
        );
      };

      const bunCoordinates = getCoordinates(bunRef);
      const sauceCoordinates = getCoordinates(sauceRef);
      const mainCoordinates = getCoordinates(mainRef);

      return isCurrentScrollingBlock(bunCoordinates, BUN)
        ? setCurrentType(BUN)
        : isCurrentScrollingBlock(sauceCoordinates, SAUCE)
        ? setCurrentType(SAUCE)
        : isCurrentScrollingBlock(mainCoordinates, MAIN_INGREDIENT)
        ? setCurrentType(MAIN_INGREDIENT)
        : undefined;
    },
    [currentType]
  );

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
      <div className={css.ingredientsRoot} onScroll={handleScroll}>
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
  ingredient: PropTypes.exact(ingredientType).isRequired,
};

IngredientsBlock.propTypes = {
  filteredIngredients: PropTypes.arrayOf(PropTypes.exact(ingredientType))
    .isRequired,
  ingredientTitle: PropTypes.string.isRequired,
};

export default BurgerIngredients;
