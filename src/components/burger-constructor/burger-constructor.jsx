import React, { useRef, useCallback } from "react";
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
import { useDrop, useDrag } from "react-dnd";
import update from "immutability-helper";

const AddedBurgerIngredient = ({
  ingredient,
  index,
  moveIngredient,
  removeIngredient,
}) => {
  // sorting example from react-dnd
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "burgerIngredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "burgerIngredient",
    item: () => {
      return { id: ingredient.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      key={ingredient.name}
      className={css.elemetWrapper}
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <div className="mr-2">
        <DragIcon />
      </div>
      <ConstructorElement
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
        handleClose={() => removeIngredient(ingredient.createdAt, ingredient)}
      />
    </div>
  );
};

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const burgerIngredients = useSelector(
    (store) => store.burgerIngredients.items
  );

  const selectedBun = useSelector((store) => store.burgerIngredients.bun);
  const { isOpenModal, closeModal, openModal } = useModal();

  const [{ canDrop, hovered }, dropTargetRef] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      hovered: monitor.isOver(),
    }),
    drop(ingredient) {
      ingredient.type === "bun"
        ? dispatch({ type: types.ADD_BUN_BURGER, bun: ingredient })
        : dispatch({
            type: types.ADD_INGREDIENT_BURGER,
            addedIngredient: { ...ingredient, createdAt: +new Date() },
          });

      dispatch({
        type: types.INCREASE_INGREDIENT_COUNTER,
        addedIngredient: ingredient,
      });
    },
  });

  const closeModalWithDispatch = () => {
    dispatch({ type: types.REMOVE_ORDER });
    closeModal();
  };

  const createOrder = () => {
    dispatch(
      createOrderAction({
        ingredients: [...burgerIngredients.map((i) => i._id), selectedBun._id],
      })
    );
    openModal();
    dispatch({ type: types.REMOVE_ALL_INGREDIENTS_BURGER });
    dispatch({ type: types.RESET_COUNTER });
  };

  const moveIngredient = useCallback(
    (dragIndex, hoverIndex) => {
      const dragIngredient = burgerIngredients[dragIndex];
      dispatch({
        type: types.SORT_INGREDIENTS_BURGER,
        sortedIngredients: update(burgerIngredients, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragIngredient],
          ],
        }),
      });
    },
    [burgerIngredients, dispatch]
  );

  const removeIngredient = (removedCreatedAt, ingredient) => {
    dispatch({
      type: types.REMOVE_INGREDIENT_BURGER,
      removedCreatedAt,
    });
    dispatch({
      type: types.DECREASE_INGREDIENT_COUNTER,
      addedIngredient: ingredient,
    });
  };

  const totalCount =
    burgerIngredients.reduce((sum, current) => sum + current.price, 0) +
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
              {burgerIngredients.map((ingredient, i) => (
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
                <CurrencyIcon />
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

AddedBurgerIngredient.propTypes = {
  ingredient: PropTypes.exact(ingredientType).isRequired,
  index: PropTypes.number.isRequired,
  moveIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
};
export default BurgerConstructor;
