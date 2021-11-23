import React, { useEffect, useState } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import css from "./app.module.css";
import { BASE_URL } from "../../constants/constants";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function App() {
  const [ingredients, setIngredients] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(BASE_URL);
        const { data } = await res.json();
        setIngredients(data);
      } catch (error) {
        setError(error);
        console.error("Error has occurred when fetching data: ", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={css.app}>
        <AppHeader />
        <main className={css.content}>
          {!error ? (
            <>
              {ingredients && <BurgerIngredients ingredients={ingredients} />}
              {ingredients && <BurgerConstructor ingredients={ingredients} />}
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
