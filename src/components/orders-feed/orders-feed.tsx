import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN } from "../../constants/constants";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../services/actions/ws";
import OrderCard from "../order-card/order-card";
import { IOrderWsResponse } from "../../services/types/data";
import css from "./orders-feed.module.css";
import { useLocation } from "react-router-dom";
import cn from "classnames";

const OrdersFeed = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies([ACCESS_TOKEN]);
  const orders = useSelector((state) => state.ws.orders);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/feed") {
      dispatch(wsConnectionStart());
    } else {
      dispatch(
        wsConnectionStart(cookies[ACCESS_TOKEN]?.replace("Bearer ", ""))
      );
    }
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, []);

  return (
    <ul className={cn(css.root, { [css.rootAllOrders]: pathname === "/feed" })}>
      {orders.orders?.map((order: IOrderWsResponse) => (
        <OrderCard
          key={order._id}
          order={order}
          allOrdersType={pathname === "/feed"}
        />
      ))}
    </ul>
  );
};

export default OrdersFeed;
