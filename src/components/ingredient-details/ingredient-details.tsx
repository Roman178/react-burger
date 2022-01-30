import React, { FC, useEffect } from "react";
import cn from "classnames";
import css from "./ingredient-details.module.css";
import { useDispatch, useSelector } from "../../services/hooks";
import { IIngredient } from "../../services/types/data";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  removeCurrentIngredient,
  setCurrentIngredient,
} from "../../services/actions/ingredients";

const IngredientDetails: FC = () => {
  const { image_large, name, calories, proteins, fat, carbohydrates } =
    useSelector((store) => store.currentIngredient as IIngredient);
  const params = useParams<{ id: string }>();
  const ingredients = useSelector((store) => store.ingredients.items);
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (history.action === "POP")
      history.replace({ pathname: location.pathname, state: undefined });
  }, []);

  useEffect((): any => {
    if (params.id && ingredients.length > 0) {
      const currentIngredient = ingredients.find(
        (ingredient) => ingredient._id === params.id
      );
      dispatch(setCurrentIngredient(currentIngredient as IIngredient));
    }
    return () => dispatch(removeCurrentIngredient());
  }, [params.id, ingredients, dispatch]);

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

export default IngredientDetails;
