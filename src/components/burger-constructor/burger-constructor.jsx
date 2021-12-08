import React, { useMemo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { ingredientType } from "../../types/index";
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
import { useSelector, useDispatch } from "react-redux";
import * as types from "../../services/actions/actionTypes";
import { createOrder as createOrderAction } from "../../services/actions/index";

const BurgerConstructor = () => {
  // const selectedBun = useMemo(
  //   () => ingredients.find((ingredient) => ingredient.type === "bun"),
  //   [ingredients]
  // );

  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.items);
  const burgerIngredients = useSelector(
    (store) => store.burgerIngredients.items
  );

  useEffect(() => {
    if (ingredients.length > 0) {
      dispatch({
        type: types.ADD_BUN_BURGER,
        bun: ingredients.find((item) => item.type === "bun"),
      });
    }
  }, [dispatch, ingredients]);

  const selectedBun = useSelector((store) => store.burgerIngredients.bun);

  const { isOpenModal, closeModal, openModal } = useModal();

  const totalCount = ingredients.reduce(
    (sum, current) => sum + current.price,
    0
  );

  const createOrder = () => {
    dispatch(
      createOrderAction({
        ingredients: [
          burgerIngredients[0]._id,
          selectedBun._id,
          selectedBun._id,
        ],
      })
    );
    openModal();
  };

  return (
    <>
      {isOpenModal && (
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
      <div className={css.root}>
        <div className={cn(css.elemetWrapper, "mb-4", "pr-4")}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={selectedBun.name + " (верх)"}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        </div>
        <div className={css.elements}>
          {
            //burgerIngredients &&
            //burgerIngredients.length > 0 &&
            // ingredients
            //   .filter((i) => i.type !== "bun")
            burgerIngredients.map((ingredient) => (
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
            ))
          }
        </div>
        <div className={cn(css.elemetWrapper, "mt-4", "pr-4")}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={selectedBun.name + " (низ)"}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
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
          <Button type="primary" size="medium" onClick={createOrder}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.exact(ingredientType)).isRequired,
};

export default BurgerConstructor;
