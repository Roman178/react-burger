import React, { forwardRef } from "react";
import { IIngredient } from "../../services/types/data";
import IngredientCard from "../ingredient-card/ingredient-card";
import css from "./ingredients-block.module.css";

interface IIngredientsBlockProps {
  ingredientTitle: string;
  filteredIngredients: IIngredient[];
}

const IngredientsBlock = forwardRef<HTMLHeadingElement, IIngredientsBlockProps>(
  ({ ingredientTitle, filteredIngredients }, ref) => {
    return (
      <div className="pb-10">
        <h3 className="text text_type_main-medium mb-6" ref={ref}>
          {ingredientTitle}
        </h3>
        <ul className={css.cards}>
          {filteredIngredients.map((i: IIngredient) => (
            <IngredientCard key={i._id} ingredient={i} />
          ))}
        </ul>
      </div>
    );
  }
);

export default IngredientsBlock;
