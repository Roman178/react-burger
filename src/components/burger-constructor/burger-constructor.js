import React, { useCallback, useMemo, useState } from "react";
import css from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useModal } from "../../hooks/useModal";

const BurgerConstructor = ({ selectedIngredients, removeIngredient }) => {
  const selectedBun = useMemo(
    () => selectedIngredients.find((ingredient) => ingredient.type === "bun"),
    [selectedIngredients]
  );
  const { isOpenModal, closeModal, openModal } = useModal();

  return (
    <>
      <Modal closeModal={closeModal} isOpenModalProp={isOpenModal}>
        <OrderDetails />
      </Modal>
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
        <Button type="primary" size="medium" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
    </>
  );
};

export default BurgerConstructor;
