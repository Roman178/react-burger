import cn from "classnames";
import React from "react";
import orderSuccess from "../../images/order-success.png";
import css from "./order-details.module.css";

const OrderDetails = () => {
  return (
    <div className={css.root}>
      <p className="text text_type_digits-large mb-8">034536</p>
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
    </div>
  );
};

export default OrderDetails;
