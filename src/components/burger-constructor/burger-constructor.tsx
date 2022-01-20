import React, { useCallback, FC } from "react";
import css from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useModal } from "../../hooks/useModal";
import cn from "classnames";
import { useSelector, useDispatch } from "../../services/hooks";
import { createOrder as createOrderAction } from "../../services/actions/orders";
import { useDrop, DropTargetMonitor } from "react-dnd";
import update from "immutability-helper";
import AddedBurgerIngredient from "../added-burger-ingredient/added-burger-ingredient";
import { IIngredient } from "../../services/types/data";
import {
  addBunToBurger,
  addIngredientToBurger,
  removeAllIngredientsFromBurger,
  removeIngredientFromBurger,
  sortIngredientsBurger,
} from "../../services/actions/ingredients";
import {
  decreaseIngredientCounter,
  increaseIngredientCounter,
  resetCounter,
} from "../../services/actions/counter";
import { removeOrder } from "../../services/actions/orders";

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const burgerIngredients = useSelector(
    (store) => store.burgerIngredients.items
  );

  const selectedBun: IIngredient = useSelector(
    (store) => store.burgerIngredients.bun!
  );
  const { isOpenModal, closeModal, openModal } = useModal();

  const [{ canDrop, hovered }, dropTargetRef] = useDrop({
    accept: "ingredient",
    collect: (monitor: DropTargetMonitor) => ({
      canDrop: monitor.canDrop(),
      hovered: monitor.isOver(),
    }),
    drop(ingredient: IIngredient) {
      ingredient.type === "bun"
        ? dispatch(addBunToBurger(ingredient))
        : dispatch(
            addIngredientToBurger({ ...ingredient, createdAt: +new Date() })
          );

      dispatch(increaseIngredientCounter(ingredient));
    },
  });

  const closeModalWithDispatch = () => {
    dispatch(removeOrder());
    closeModal();
  };

  const createOrder = () => {
    dispatch(
      createOrderAction({
        ingredients: [
          ...burgerIngredients.map((i: IIngredient) => i._id),
          selectedBun._id,
        ],
      })
    );
    openModal();
    dispatch(removeAllIngredientsFromBurger());
    dispatch(resetCounter());
  };

  const moveIngredient = useCallback(
    (dragIndex, hoverIndex) => {
      const dragIngredient = burgerIngredients[dragIndex];
      dispatch(
        sortIngredientsBurger(
          update(burgerIngredients, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragIngredient],
            ],
          })
        )
      );
    },
    [burgerIngredients, dispatch]
  );

  const removeIngredient = (
    removedCreatedAt: IIngredient["createdAt"],
    ingredient: IIngredient
  ) => {
    dispatch(removeIngredientFromBurger(removedCreatedAt));
    dispatch(decreaseIngredientCounter(ingredient));
  };

  const totalCount =
    burgerIngredients.reduce(
      (sum: number, current: IIngredient) => sum + current.price,
      0
    ) +
    selectedBun?.price * 2;

  return (
    <>
      {isOpenModal && (
        <Modal closeModal={closeModalWithDispatch}>
          <OrderDetails />
        </Modal>
      )}
      <div className={css.root} ref={dropTargetRef}>
        <div
          className={cn(css.dropOverlayInvisible, {
            [css.dropOverlay]: canDrop,
          })}
        >
          <p className={cn(css.dropOverlayText, "text text_type_main-medium")}>
            Добавьте ингредиент в бургер
          </p>
          <p
            className={cn(css.dropOverlayPlus, {
              [css.dropOverlayPlusHover]: hovered,
            })}
          >
            +
          </p>
        </div>
        {selectedBun ? (
          <>
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
              {burgerIngredients.map((ingredient: IIngredient, i: number) => (
                <AddedBurgerIngredient
                  ingredient={ingredient}
                  index={i}
                  moveIngredient={moveIngredient}
                  key={ingredient.createdAt}
                  removeIngredient={removeIngredient}
                />
              ))}
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
                  {!isNaN(totalCount) && totalCount}
                </p>
                <CurrencyIcon type="primary" />
              </div>
              <Button type="primary" size="medium" onClick={createOrder}>
                Оформить заказ
              </Button>
            </div>
          </>
        ) : (
          <div className={css.suggestion}>
            <p className="text text_type_main-medium">
              Переносите сюда ингредиенты.
            </p>
            <p className="text text_type_main-medium">Начните с булки.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default BurgerConstructor;
