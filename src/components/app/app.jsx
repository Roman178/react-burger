import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import css from "./app.module.css";
import { BASE_URL } from "../../constants/constants";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function App() {
  const [error, setError] = useState(null);

  return (
    <>
      <div className={css.app}>
        <AppHeader />
        <main className={css.content}>
          {!error ? (
            <>
              <BurgerIngredients />
              {/* <BurgerConstructor /> */}
            </>
          ) : (
            <p className="text text_type_main-default mt-10">
              <InfoIcon type="error" />
              Произошла ошибка: {error.message}. Попробуйте зайти позже.
            </p>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
