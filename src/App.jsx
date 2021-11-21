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
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = useCallback(() => {
    setIsOpenModal(true);
  }, [setIsOpenModal]);

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, [setIsOpenModal]);

  const modalProps = useMemo(
    () => ({ isOpenModal, openModal, closeModal }),
    [isOpenModal, openModal, closeModal]
  );

  const addIngredient = (addedIngredient) => {
    addedIngredient.type === "bun"
      ? setSelectedIngredients([
          ...selectedIngredients.filter((i) => i.type !== "bun"),
          addedIngredient,
        ])
      : setSelectedIngredients([...selectedIngredients, addedIngredient]);
  };

  const removeIngredient = (
    removedIngredientIndex,
    selectedIngredientsWithoutBun
  ) => {
    const bun = selectedIngredients.find((i) => i.type === "bun");
    setSelectedIngredients([
      ...selectedIngredientsWithoutBun.filter(
        (_, index) => index !== removedIngredientIndex
      ),
      bun,
    ]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(BASE_URL);
      const { data } = await res.json();
      setIngredients(data);
      setSelectedIngredients([
        ...selectedIngredients,
        data.find((ingredient) => ingredient.type === "bun"),
      ]);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={css.app}>
        <AppHeader />
        <main className={css.content}>
          {ingredients && (
            <BurgerIngredients
              addIngredient={addIngredient}
              ingredients={ingredients}
              modalProps={modalProps}
            />
          )}
          {selectedIngredients.length > 0 && (
            <BurgerConstructor
              selectedIngredients={selectedIngredients}
              removeIngredient={removeIngredient}
              modalProps={modalProps}
            />
          )}
        </main>
      </div>
    </>
  );
}

export default App;
