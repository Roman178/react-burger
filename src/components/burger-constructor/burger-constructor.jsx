import React, { useMemo } from "react";
import PropTypes from "prop-types";
import css from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useModal } from "../../hooks/useModal";
import cn from "classnames";

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
              <div key={ingredient.name} className={css.elemetWrapper}>
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

        <div className={cn(css.totalBox, "mt-10 pr-5")}>
          <div className={cn(css.totalCountWrapper, "mr-10")}>
            <p
              className={cn(
                css.totalCountDigit,
                "text text_type_digits-medium"
              )}
            >
              {totalCount}
            </p>
            <CurrencyIcon />
          </div>
          <Button type="primary" size="medium" onClick={openModal}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.exact({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    })
  ),
};

export default BurgerConstructor;
