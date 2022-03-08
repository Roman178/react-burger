import React, { FC } from "react";
import { useSelector } from "../../services/hooks";
import { IOrderWsResponse } from "../../services/types/data";
import css from "./order-card.module.css";
import cn from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";

interface IOrderCardProps {
  order: IOrderWsResponse;
  allOrdersType?: boolean;
}

const OrderCard: FC<IOrderCardProps> = ({ order, allOrdersType = false }) => {
  const ingredients = useSelector((state) => state.ingredients);
  const orderCost = order.ingredients.reduce((acc: any, ingredient) => {
    return acc + ingredients.items.find((i) => i._id === ingredient)?.price;
  }, 0);

  const location = useLocation();

  return (
    <Link
      className={css.link}
      // to={`${location.pathname}/${order._id}`}
      to={{
        pathname: `${location.pathname}/${order._id}`,
        state: { background: location },
      }}
    >
      <li className={cn(css.root, { [css.rootAllOrders]: allOrdersType })}>
        <div className={css.wrapper}>
          <p
            className={cn(
              "text text_type_digits-default mb-6",
              css.orderNumber
            )}
          >
            #{order.number}
          </p>
          <p
            className={cn(
              "text text_type_main-default text_color_inactive",
              css.orderCreatedAt
            )}
          >
            {order.createdAt}
          </p>
        </div>
        <p
          className={cn("text text_type_main-medium mb-2", css.orderName, {
            "mb-6": allOrdersType,
          })}
        >
          {order.name}
        </p>
        <p
          className={cn("text text_type_main-small mb-6", {
            [css.statusDisplayNone]: allOrdersType,
          })}
        >
          {order.status}
        </p>
        <div className={css.wrapper}>
          <div className={css.iconsContainer}>
            {order.ingredients.map((ingredient: any, index: number, arr) => {
              const srcImg = ingredients.items.find(
                (i) => i._id === ingredient
              )?.image_mobile;
              const ingredientName = ingredients.items.find(
                (i) => i._id === ingredient
              )?.name;
              return (
                <div
                  key={index}
                  style={{ zIndex: arr.length - 1 - index }}
                  className={css.ingredientIconWrapper}
                >
                  <img
                    className={css.ingredientIcon}
                    src={srcImg}
                    alt={ingredientName}
                  />
                </div>
              );
            })}
          </div>
          <div className={css.orderCostClass}>
            <p className="text text_type_digits-default mr-2">{orderCost}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
    </Link>
  );
};

export default OrderCard;
