import React, { FC } from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "../../services/hooks";
import { useModal } from "../../hooks/useModal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import cn from "classnames";
import css from "./ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import {
  removeCurrentIngredient,
  setCurrentIngredient,
} from "../../services/actions/ingredients";
import { IIngredient } from "../../services/types/data";
import { useHistory } from "react-router-dom";

interface IIngredientCardProps {
  ingredient: IIngredient;
}

const IngredientCard: FC<IIngredientCardProps> = ({ ingredient }) => {
  const history = useHistory();

  const { isOpenModal, closeModal, openModal } = useModal();
  const ingredientQty = useSelector(
    (store) =>
      store.burgerIngredients.quantity.find(
        (i: { id: string; type: string; qty: number }) =>
          i.id === ingredient._id
      )?.qty
  );
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  const setIngredient = () => {
    dispatch(setCurrentIngredient(ingredient));
    openModal();
    history.push(`/ingredients/${ingredient._id}`);
  };

  const closeModalWithDispatch = () => {
    dispatch(removeCurrentIngredient());
    closeModal();
    history.push({ pathname: "/" });
  };

  return (
    <>
      {isOpenModal && (
        <Modal closeModal={closeModalWithDispatch}>
          <IngredientDetails />
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
          <CurrencyIcon type="primary" />
        </div>
        <span className={cn(css.ingredientName, "text text_type_main-default")}>
          {ingredient.name}
        </span>
      </li>
    </>
  );
};

export default IngredientCard;
