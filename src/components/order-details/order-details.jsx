import React from "react";
import orderSuccess from "../../images/order-success.png";
import css from "./order-details.module.css";
import { useSelector } from "react-redux";
import Spinner from "../spinner/spinner";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderDetails = () => {
  const orderNumber = useSelector(
    (store) => store.order.currentOrder.order?.number
  );
  const loading = useSelector((store) => store.order.orderRequest);
  const error = useSelector((store) => store.order.orderFailed);

  return (
    <div className={css.root}>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text text_type_main-default mt-10">
          <InfoIcon type="error" />
          Произошла ошибка. Попробуйте сделать заказ позже.
        </p>
      ) : (
        <>
          <p className="text text_type_digits-large mb-8">{orderNumber}</p>

          <p className="text text_type_main-medium">идентификатор заказа</p>
          <img
            className={css.orderSuccessImg}
            src={orderSuccess}
            alt="Заказ подтвержден"
          />
          <p className="text text_type_main-default mb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
