import React, { useEffect, useState } from "react";
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor.js";
import css from "./App.module.css";

function App() {
  const [ingredients, setIngredients] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedBun, setSelectedBun] = useState(null);

  const addIngredient = (addedIngredient) => {
    if (addedIngredient.type === "bun" && !selectedBun) {
      setSelectedBun(addedIngredient);
    }
    const test = new Set(selectedIngredients);
    test.add(addedIngredient);
    console.log(test);
    setSelectedIngredients([...selectedIngredients, addedIngredient]);
  };

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
    <div className={css.app}>
      <AppHeader />
      <main className={css.content}>
        {ingredients && (
          <BurgerIngredients
            addIngredient={addIngredient}
            ingredients={ingredients}
          />
        )}
        {ingredients && (
          <BurgerConstructor selectedIngredients={selectedIngredients} />
        )}
      </main>
    </div>
  );
}

export default App;
