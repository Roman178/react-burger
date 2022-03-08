import React from "react";
import OrdersFeed from "../../components/orders-feed/orders-feed";
import { useSelector } from "../../services/hooks";
import css from "./feed.module.css";
import { IOrderWsResponse } from "../../services/types/data";
import cn from "classnames";

const Feed = () => {
  const { orders, total, totalToday } = useSelector((state) => state.ws.orders);

  return (
    <div className={css.root}>
      <div className={css.wrapper}>
        <h1 className="text text_type_main-large mt-10 mb-4">Лента заказов</h1>
        <OrdersFeed />
      </div>
      <div className={css.totalWrapper}>
        <div className={css.ordersWrapper}>
          <div className={css.doneOrdersWrapper}>
            <p className="text text_type_main-medium mb-2">Готовы:</p>
            <div className={css.doneOrders}>
              {orders &&
                orders
                  .filter((o: IOrderWsResponse) => o.status === "done")
                  .map((order: IOrderWsResponse) => (
                    <p
                      key={order._id}
                      className={cn(
                        "text text_type_digits-default mb-2",
                        css.doneOrderNumber
                      )}
                    >
                      {order.number}
                    </p>
                  ))}
            </div>
          </div>
          <div className={css.inProgressOrdersWrapper}>
            <p className="text text_type_main-medium mb-2">В работе:</p>
            <div className={css.inProgressOrders}>
              <p>
                {orders &&
                  orders
                    .filter((o: IOrderWsResponse) => o.status === "pending")
                    .map((order: IOrderWsResponse) => (
                      <p
                        key={order._id}
                        className="text text_type_digits-default mb-2"
                      >
                        {order.number}
                      </p>
                    ))}
              </p>
            </div>
          </div>
        </div>
        <p className="text text_type_main-default mt-2 mb-2">
          Выполнено за всё время
        </p>
        <p className="text text_type_digits-medium">{total}</p>
        <p className="text text_type_main-default mt-2 mb-2">
          Выполнено за сегодня
        </p>
        <p className="text text_type_digits-medium">{totalToday}</p>
      </div>
    </div>
  );
};

export default Feed;
