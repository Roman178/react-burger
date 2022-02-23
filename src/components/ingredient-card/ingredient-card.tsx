import React, { FC } from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "../../services/hooks";
import cn from "classnames";
import css from "./ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { setCurrentIngredient } from "../../services/actions/ingredients";
import { IIngredient } from "../../services/types/data";
import { Link, useLocation } from "react-router-dom";

interface IIngredientCardProps {
  ingredient: IIngredient;
}

const IngredientCard: FC<IIngredientCardProps> = ({ ingredient }) => {
  const location = useLocation();

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
  };

  return (
    <Link
      className={css.link}
      to={{
        pathname: `/ingredients/${ingredient._id}`,
        state: { background: location },
      }}
    >
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
    </Link>
  );
};

export default IngredientCard;
