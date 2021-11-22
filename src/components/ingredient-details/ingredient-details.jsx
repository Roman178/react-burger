import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import css from "./ingredient-details.module.css";

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

IngredientDetails.propTypes = {
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
};

export default IngredientDetails;
