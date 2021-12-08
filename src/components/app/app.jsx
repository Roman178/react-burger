import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import css from "./app.module.css";
import { BASE_URL } from "../../constants/constants";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Spinner from "../spinner/spinner";

function App() {
  const error = useSelector((store) => store.ingredients.ingredientsFailed);
  const loading = useSelector((store) => store.ingredients.ingredientsRequest);

  return (
    <>
      <div className={css.app}>
        <AppHeader />

        {loading ? (
          <Spinner />
        ) : (
          <main className={css.content}>
            {!error ? (
              <>
                <BurgerIngredients />
                <BurgerConstructor />
              </>
            ) : (
              <p className="text text_type_main-default mt-10">
                <InfoIcon type="error" />
                Произошла ошибка. Попробуйте зайти позже.
              </p>
            )}
          </main>
        )}
      </div>
    </>
  );
}

export default App;
