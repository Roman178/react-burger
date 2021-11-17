import React, { useEffect, useState } from "react";
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import css from "./App.module.css";

function App() {
  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://norma.nomoreparties.space/api/ingredients"
      );
      const { data } = await res.json();
      setIngredients(data);
    };
    fetchData();
  }, []);

  return (
    <div className={css.root}>
      <AppHeader />
      {ingredients && <BurgerIngredients ingredients={ingredients} />}
    </div>
  );
}

export default App;
