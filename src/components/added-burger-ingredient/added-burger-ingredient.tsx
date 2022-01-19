import React, { useRef, FC } from "react";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import css from "./added-burger-ingredient.module.css";
import { IIngredient } from "../../services/types/data";

interface IAddedBurgerIngredientProps {
  ingredient: IIngredient;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  removeIngredient: (
    createdAt: number | undefined,
    ingredient: IIngredient
  ) => void;
}

const AddedBurgerIngredient: FC<IAddedBurgerIngredientProps> = ({
  ingredient,
  index,
  moveIngredient,
  removeIngredient,
}) => {
  // sorting example from react-dnd
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "burgerIngredient",
    collect(monitor: DropTargetMonitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { id: string; index: number }, monitor: DropTargetMonitor) {
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
      const hoverClientY = clientOffset
        ? clientOffset.y - hoverBoundingRect.top
        : 0;
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
      return { id: ingredient._id, index };
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
        <DragIcon type="primary" />
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

export default AddedBurgerIngredient;
