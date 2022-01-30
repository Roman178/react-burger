import React, { FC, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useHistory, useLocation, useParams } from "react-router-dom";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { setCurrentIngredient } from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "../../services/hooks";
import { IIngredient } from "../../services/types/data";

const Home: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.items);

  const isStraightIngredientLink =
    history.action === "POP" && location.pathname.includes("ingredients");

  useEffect(() => {
    if (isStraightIngredientLink) {
      const currentIngredient = ingredients.find(
        (ingredient) => ingredient._id === params.id
      );
      if (currentIngredient) {
        dispatch(setCurrentIngredient(currentIngredient as IIngredient));
      }
    }
  }, [dispatch, ingredients, isStraightIngredientLink, params.id]);

  return (
    <>
      {isStraightIngredientLink ? (
        <IngredientDetails />
      ) : (
        <>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </>
      )}
    </>
  );
};

export default Home;
