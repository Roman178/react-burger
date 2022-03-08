import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks";
import { IOrderWsResponse } from "../../services/types/data";
import css from "./order-info.module.css";
import cn from "classnames";
import { wsConnectionStart } from "../../services/actions/ws";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN } from "../../constants/constants";

const OrderInfo: FC = () => {
  const params = useParams<{ orderId: string }>();
  const { pathname } = useLocation();
  const [cookies] = useCookies([ACCESS_TOKEN]);
  const dispatch = useDispatch();

  const order: IOrderWsResponse = useSelector((state) =>
    state.ws.orders.orders?.find(
      (o: IOrderWsResponse) => o._id === params.orderId
    )
  );

  useEffect(() => {
    if (!order) {
      if (pathname.includes("/feed")) dispatch(wsConnectionStart());
      else
        dispatch(
          wsConnectionStart(cookies[ACCESS_TOKEN]?.replace("Bearer ", ""))
        );
    }
  }, []);

  const totalCost = useSelector((state) => {
    const ingredientPrices = order?.ingredients.map(
      (ingredient) =>
        state.ingredients.items?.find((i) => i._id === ingredient)?.price
    );

    return ingredientPrices?.reduce((acc: number, curr: any) => {
      return acc + curr;
    }, 0);
  });

  const nonReturnedIngredientIds = Array.from(new Set(order?.ingredients));

  const ingredients = useSelector((state) => {
    return nonReturnedIngredientIds.map((ingredient) =>
      state.ingredients.items?.find((i) => i._id === ingredient)
    );
  });

  if (!order) return null;

  return (
    <div className={cn("p-8", css.root)}>
      <p className={cn("mb-10 text text_type_digits-default", css.orderNumber)}>
        #{order.number}
      </p>
      <p className={cn("mb-3 text text_type_main-medium", css.orderName)}>
        {order.name}
      </p>
      <p className={cn("mb-15 text text_type_main-small", css.orderStatus)}>
        {order.status}
      </p>
      <p className="mb-6 text text_type_main-medium">Состав:</p>
      <div className={css.ingredientsWrapper}>
        {ingredients.reverse().map((i) => {
          return (
            <div key={i?._id} className={cn("mb-4", css.ingredientDetails)}>
              <div className={css.imgNameContainer}>
                <div className={css.imgWrapper}>
                  <img
                    className={css.img}
                    src={i?.image_mobile}
                    alt={i?.name}
                  />
                </div>
                <p className="text text_type_main-default">{i?.name}</p>
              </div>
              <p className={cn("text text_type_main-medium", css.price)}>
                {i?.type === "bun"
                  ? "2"
                  : order.ingredients.filter((ingr) => ingr === i?._id)
                      .length}{" "}
                x {i?.price}
                <CurrencyIcon type="primary" />
              </p>
            </div>
          );
        })}
      </div>
      <div className={css.totalContainer}>
        <p className="text text_type_main-default text_color_inactive">
          {order.createdAt}
        </p>
        <p className={cn("text text_type_digits-default", css.totalCostClass)}>
          <span className="mr-2">{totalCost}</span>{" "}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};

export default OrderInfo;
