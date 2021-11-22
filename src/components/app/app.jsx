import React, { useEffect, useState } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import css from "./app.module.css";
import { BASE_URL } from "../../constants/constants";

function App() {
  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(BASE_URL);
        const { data } = await res.json();
        setIngredients(data);
      } catch (error) {
        console.error(
          "Error has occurred when trying fetch data ",
          error.message
        );
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={css.app}>
        <AppHeader />
        <main className={css.content}>
          {ingredients && <BurgerIngredients ingredients={ingredients} />}
          {ingredients && <BurgerConstructor ingredients={ingredients} />}
        </main>
      </div>
    </>
  );
}

export default App;
