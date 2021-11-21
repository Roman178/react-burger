import React, { useMemo } from "react";
import css from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useModal } from "../../hooks/useModal";

const BurgerConstructor = ({ ingredients }) => {
  const selectedBun = useMemo(
    () => ingredients.find((ingredient) => ingredient.type === "bun"),
    [ingredients]
  );
  const { isOpenModal, closeModal, openModal } = useModal();

  const totalCount = ingredients.reduce(
    (sum, current) => sum + current.price,
    0
  );

  return (
    <>
      <Modal closeModal={closeModal} isOpenModalProp={isOpenModal}>
        <OrderDetails />
      </Modal>
      <div className={css.root}>
        <div className={css.elements}>
          <div className={css.elemetWrapper}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={selectedBun.name}
              price={selectedBun.price}
              thumbnail={selectedBun.image}
            />
          </div>
          {ingredients
            .filter((i) => i.type !== "bun")
            .map((ingredient) => (
              <div className={css.elemetWrapper}>
                <div className="mr-2">
                  <DragIcon />
                </div>
                <ConstructorElement
                  text={ingredient.name}
                  thumbnail={ingredient.image}
                  price={ingredient.price}
                />
              </div>
            ))}
          <div className={css.elemetWrapper}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={selectedBun.name}
              price={selectedBun.price}
              thumbnail={selectedBun.image}
            />
          </div>
        </div>

        <div className="mt-10">
          <p>{totalCount}</p>
          <Button type="primary" size="medium" onClick={openModal}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  );
};

export default BurgerConstructor;
