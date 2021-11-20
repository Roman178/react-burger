import React, { useMemo } from "react";
import css from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";

const BurgerConstructor = ({
  selectedIngredients,
  removeIngredient,
  isOpenModal,
  openModal,
  closeModal,
}) => {
  const selectedBun = useMemo(
    () => selectedIngredients.find((ingredient) => ingredient.type === "bun"),
    [selectedIngredients]
  );

  return (
    <>
      {isOpenModal && <Modal closeModal={closeModal}></Modal>}
      <div className={css.root}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={selectedBun.name}
          price={selectedBun.price}
          thumbnail={selectedBun.image}
        />
        {selectedIngredients
          .filter((i) => i.type !== "bun")
          .map((ingredient, index, arr) => (
            <ConstructorElement
              text={ingredient.name}
              thumbnail={ingredient.image}
              price={ingredient.price}
              handleClose={() => removeIngredient(index, arr)}
            />
          ))}
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={selectedBun.name}
          price={selectedBun.price}
          thumbnail={selectedBun.image}
        />
        <Button type="primary" size="medium" onClick={() => openModal()}>
          Оформить заказ
        </Button>
      </div>
    </>
  );
};

export default BurgerConstructor;
