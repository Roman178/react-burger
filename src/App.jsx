import React, { useCallback, useEffect, useMemo, useState } from "react";
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import ModalOverlay from "./components/modal-overlay/modal-overlay";
import css from "./App.module.css";
import Modal from "./components/modal/modal";

const BASE_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(BASE_URL);
      const { data } = await res.json();
      setIngredients(data);
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
