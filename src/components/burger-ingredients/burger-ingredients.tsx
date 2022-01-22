import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  RefObject,
  FC,
} from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import css from "./burger-ingredients.module.css";

import {
  BUN,
  SAUCE,
  MAIN_INGREDIENT,
  translate,
} from "../../constants/constants";
import { getIngredientsThunk } from "../../services/actions/ingredients";
import IngredientsBlock from "../ingredients-block/ingredients-block";
import { IIngredient } from "../../services/types/data";

const BurgerIngredients: FC = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.items);

  useEffect(() => {
    if (ingredients.length === 0) dispatch(getIngredientsThunk());
  }, [dispatch, ingredients]);

  const [currentType, setCurrentType] = useState(BUN);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);
  const refs = {
    [`${BUN}Ref`]: bunRef,
    [`${SAUCE}Ref`]: sauceRef,
    [`${MAIN_INGREDIENT}Ref`]: mainRef,
  };

  const handleScroll = useCallback(
    (e) => {
      const mainBlockTopCoordinate = e.target.getBoundingClientRect().top;

      const getCoordinates = (ref: RefObject<any>) => {
        return {
          top: ref.current.parentNode.getBoundingClientRect().top,
          bottom: ref.current.parentNode.getBoundingClientRect().bottom,
        };
      };

      const isCurrentScrollingBlock = (
        coordinates: {
          top: DOMRectReadOnly["top"];
          bottom: DOMRectReadOnly["bottom"];
        },
        ingredientType: string
      ) => {
        return (
          Math.round(coordinates.top) <= Math.round(mainBlockTopCoordinate) &&
          Math.round(coordinates.bottom) > Math.round(mainBlockTopCoordinate) &&
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

  const handleTabClick = (type: string) => {
    refs[`${type}Ref`]?.current?.scrollIntoView();
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
              (i: IIngredient) => i.type === ingredientType
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default BurgerIngredients;
