import React from "react";
import cn from "classnames";
import css from "./ingredient-details.module.css";
import { ingredientType } from "../../types";

const IngredientDetails = ({
  image_large,
  name,
  calories,
  proteins,
  fat,
  carbohydrates,
}) => {
  return (
    <div className={css.root}>
      <p className={cn(css.title, "text text_type_main-large")}>
        Детали ингредиента
      </p>
      <img className="mb-4" src={image_large} alt={name} />
      <p className="text text_type_main-medium mb-8">{name}</p>
      <div className={css.info}>
        <div className={css.nutritionalValue}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Каллории, ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {calories}
          </p>
        </div>
        <div className={css.nutritionalValue}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {proteins}
          </p>
        </div>
        <div className={css.nutritionalValue}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {fat}
          </p>
        </div>
        <div className={css.nutritionalValue}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = ingredientType;

export default IngredientDetails;
